resource "google_project_service" "firebase" {
  provider = google-beta
  service = "firebase.googleapis.com"
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project = var.ProjectID
  depends_on = [
	google_project_service.firebase
  ]
}

resource "google_firebase_web_app" "default" {
  provider = google-beta
  project = var.ProjectID

  display_name = "Youtube randomizer website"
  deletion_policy = "DELETE"

  depends_on = [
    google_firebase_project.default,
  ]
}

resource "google_project_service" "auth" {
  provider = google-beta
  service = "identitytoolkit.googleapis.com"
}

resource "google_identity_platform_config" "auth" {
  provider = google-beta
  autodelete_anonymous_users = true


  depends_on = [
    google_project_service.auth,
  ]
}

resource "google_identity_platform_project_default_config" "auth" {
  provider = google-beta
  sign_in {
    allow_duplicate_emails = false

    anonymous {
      enabled = true
    }

    email {
      enabled           = true
      password_required = true
    }
  }
  depends_on = [
    google_identity_platform_config.auth
  ]
}

# resource "google_identity_platform_default_supported_idp_config" "idp_config" {
#   enabled       = true
#   idp_id        = "google.com"
#   client_id     = 
#   client_secret = 
# }
# resource "google_service_account" "firebase" {
#   account_id   = "firebase"
#   display_name = "FireBase Service Account"
# }

# resource "google_project_iam_member" "service_account_firebase_admin" {
#   role   = "roles/editor"
#   member = "serviceAccount:${google_service_account.firebase.email}"
# }

# resource "google_service_account_key" "firebase_key" {
#   service_account_id = google_service_account.firebase.name
# }