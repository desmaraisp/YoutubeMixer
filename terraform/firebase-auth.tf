resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.GCPProjectId

  depends_on = [google_project_service.default]
}


resource "google_firebase_web_app" "default" {
  provider = google-beta
  project  = var.GCPProjectId

  display_name    = "Youtube randomizer website"
  deletion_policy = "DELETE"

  depends_on = [google_firebase_project.default]
}

resource "google_identity_platform_config" "auth" {
  provider                   = google-beta
  autodelete_anonymous_users = true
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
  depends_on = [google_identity_platform_config.auth]
}
