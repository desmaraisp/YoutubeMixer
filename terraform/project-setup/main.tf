provider "google" {
  project = var.ProjectID
  region  = var.region
}

resource "google_project_service" "gcp_services" {
  for_each = toset(var.gcp_service_list)
  service = each.key
}
resource "google_service_account" "project_service_account" {
  account_id   = "oidc-gh-service-account"
  display_name = "GA service account"
}

resource "google_iam_workload_identity_pool" "main" {
  workload_identity_pool_id = "gh-oidc-pool"
  description               = "Identity pool used by gh OIDC to login during GA flows"
  disabled                  = false
}

resource "google_iam_workload_identity_pool_provider" "main" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.main.workload_identity_pool_id
  workload_identity_pool_provider_id = "gh-oidc-pool-provider"
  description                        = "Identity pool used by gh OIDC to login during GA flows"
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.aud"        = "assertion.aud"
    "attribute.repository" = "assertion.repository"
  }
  oidc {
    issuer_uri        = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "wif-sa-workload" {
  service_account_id = google_service_account.project_service_account.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.main.name}/attribute.repository/desmaraisp/YoutubeMixer"
}

resource "google_project_iam_member" "sa-owner-role" {
  project            = var.ProjectID
  role               = "roles/owner"
  member             = "serviceAccount:${google_service_account.project_service_account.email}"
}

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  force_destroy = true
  location      = "US"
  storage_class = "NEARLINE"

  depends_on = [
	google_project_service.gcp_services
  ]
}

output "RemoteStateBucket" {
  value = google_storage_bucket.default.name
}
output "ProjectID" {
  value = var.ProjectID
}
output "WorkloadIDProvider" {
  value = google_iam_workload_identity_pool_provider.main.name
}
output "ServiceAccount" {
  value = google_service_account.project_service_account.email
}