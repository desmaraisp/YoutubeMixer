# provider "google-beta" {
#   project     = var.project
#   region      = var.region
# }

# resource "google_service_account" "firebase" {
#   account_id   = "firebase"
#   display_name = "FireBase Service Account"
#   depends_on = [
#     google_project_iam_member.owner,
#     google_project_service.firebase,
#   ]
# }

# resource "google_project_iam_member" "service_account_firebase_admin" {
#   role   = "roles/editor"
#   member = "serviceAccount:${google_service_account.firebase.email}"
# }

# resource "google_service_account_key" "firebase_key" {
#   service_account_id = google_service_account.firebase.name
# }

# resource "google_firebase_project" "default" {
#   provider = google-beta

#   depends_on = [
#     google_project_service.firebase,
#     google_project_iam_member.service_account_firebase_admin,
#   ]
# }
