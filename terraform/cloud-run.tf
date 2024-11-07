resource "google_cloud_run_v2_service" "default" {
  name     = "randomizer-service"
  location = var.GCPDefaultRegion
  ingress  = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    containers {
      image = var.Image
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
