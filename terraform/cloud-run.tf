resource "google_project_service" "gcp_run" {
  service = "run.googleapis.com"
}

data "google_firebase_web_app_config" "basic" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.default.app_id
}

resource "google_cloud_run_service" "nextjs-main" {
  provider = google-beta
  name     = "default-service"
  location = var.REGION

  depends_on = [
    google_project_service.gcp_run
  ]

  template {
    spec {
      service_account_name = google_service_account.cloudrun-identity.email
      containers {
        startup_probe {
          initial_delay_seconds = 10
          timeout_seconds       = 5
          period_seconds        = 15
          failure_threshold     = 2

          http_get {
            path = "/"
            port = 8080
          }
        }
        ports {
          name           = "http1"
          container_port = "8080"
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
        image = var.image
        env {
          PUBLIC_PROJECT_ID                   = var.GCP_PROJECT_ID
          PUBLIC_FIREBASE_API_KEY             = data.google_firebase_web_app_config.basic.api_key
          PUBLIC_FIREBASE_AUTH_DOMAIN         = data.google_firebase_web_app_config.basic.auth_domain
          PUBLIC_FIREBASE_STORAGE_BUCKET      = data.google_firebase_web_app_config.basic.storage_bucket
          PUBLIC_FIREBASE_MESSAGING_SENDER_ID = data.google_firebase_web_app_config.basic.messaging_sender_id
          PUBLIC_FIREBASE_APPID               = google_firebase_web_app.default.app_id
          GOOGLE_CLIENT_ID                    = var.GOOGLE_CLIENT_ID
          GOOGLE_CLIENT_SECRET                = var.GOOGLE_CLIENT_SECRET
          SPOTIFY_CLIENT_ID                   = var.SPOTIFY_CLIENT_ID
          SPOTIFY_CLIENT_SECRET               = var.SPOTIFY_CLIENT_SECRET
          YOUTUBE_API_KEY                     = google_apikeys_key.youtube.key_string
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}


# Enable unathenticated invocation of cloud function
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}
resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.nextjs-main.location
  project  = google_cloud_run_service.nextjs-main.project
  service  = google_cloud_run_service.nextjs-main.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
