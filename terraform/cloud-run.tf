resource "google_cloud_run_v2_service" "default" {
  name     = "randomizer-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.Image
      env {
        name  = "DATABASE_URL"
        value = var.DATABASE_URL
      }
      env {
        name  = "PUBLIC_SUPABASE_URL"
        value = var.PUBLIC_SUPABASE_URL
      }
      env {
        name  = "PUBLIC_SUPABASE_ANON_KEY"
        value = var.PUBLIC_SUPABASE_ANON_KEY
      }
      env {
        name  = "SPOTIFY_CLIENT_ID"
        value = var.SPOTIFY_CLIENT_ID
      }
      env {
        name  = "SPOTIFY_CLIENT_SECRET"
        value = var.SPOTIFY_CLIENT_SECRET
      }
      env {
        name  = "YOUTUBE_API_KEY"
        value = google_apikeys_key.youtube2.key_string
      }

    }
  }
}

resource "google_cloud_run_service_iam_binding" "allow-unanthenticated-access" {
  service = google_cloud_run_v2_service.default.name
  role    = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}
