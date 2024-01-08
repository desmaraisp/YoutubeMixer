resource "google_service_account" "gha_service_account" {
  account_id   = "oidc-ga-service-account"
  display_name = "github actions service account"
}

resource "google_iam_workload_identity_pool" "gha" {
  workload_identity_pool_id = "gha-oidc-pool"
  description               = "Identity pool used by github actions OIDC to login"
  disabled                  = false
}

resource "google_iam_workload_identity_pool_provider" "gha" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.gha.workload_identity_pool_id
  workload_identity_pool_provider_id = "gha-oidc-pool-provider"
  description                        = "Identity pool used by gha OIDC to login"
  attribute_mapping = {
    "google.subject"       = "assertion.sub",
    "attribute.aud"        = "assertion.aud",
    "attribute.repository" = "assertion.repository",
  }
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
  attribute_condition = "assertion.sub.startsWith(\"repo:desmaraisp/YoutubeMixer:ref:refs/heads/main\")"
}

resource "google_service_account_iam_member" "gha-sa-workload" {
  service_account_id = google_service_account.gha_service_account.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.gha.name}/attribute.repository/desmaraisp/YoutubeMixer"
}

resource "google_project_iam_member" "sa-owner-role" {
  project = "randomizer-410617"
  role    = "roles/owner"
  member  = "serviceAccount:${google_service_account.gha_service_account.email}"
}
