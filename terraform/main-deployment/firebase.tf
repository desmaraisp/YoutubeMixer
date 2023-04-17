resource "google_project_service" "firebase" {
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
  service = "identitytoolkit.googleapis.com"
}

resource "google_identity_platform_config" "auth" {
  autodelete_anonymous_users = true
  provider = google-beta


  depends_on = [
    google_project_service.auth,
  ]
}

resource "google_identity_platform_project_default_config" "auth" {
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