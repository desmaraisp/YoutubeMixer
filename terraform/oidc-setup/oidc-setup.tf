provider "google" {
  project = var.ProjectID
  region  = var.region
}

resource "google_project_service" "gcp_services" {
  for_each = toset(var.gcp_service_list)
  service = each.key
}
resource "google_service_account" "project_service_account" {
  account_id   = "oidc-gcp-service-account"
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

resource "google_service_account_iam_member" "wif-sa" {
  service_account_id = google_service_account.project_service_account.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.main.name}/attribute.repository/desmaraisp/YoutubeMixer"
}