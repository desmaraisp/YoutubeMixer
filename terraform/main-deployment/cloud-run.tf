resource "google_project_service" "gcp_run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "nextjs-main" {
  name     = "nextjs-main"
  location = var.region

  depends_on = [
	google_project_service.gcp_run
  ]

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}