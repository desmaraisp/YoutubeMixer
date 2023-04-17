resource "google_service_account" "cloudrun-identity" {
  account_id   = "application-cloud-run-identity"
  display_name = "Idenity for application running on Cloud Run"
}

resource "google_project_iam_custom_role" "cloudrun-role" {
  role_id     = "CloudRunRole"
  title       = "CloudRun custom role for minimal access"
  permissions = ["datastore.entities.create", "datastore.entities.get", "datastore.entities.list", "datastore.entities.update"]
}


resource "google_project_iam_member" "firebase-admin-iam" {
  project = var.ProjectID
  role     = google_project_iam_custom_role.cloudrun-role.name
  member   = "serviceAccount:${google_service_account.cloudrun-identity.email}"
}