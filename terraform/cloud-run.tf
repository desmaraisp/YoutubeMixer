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
    }
  }
}
