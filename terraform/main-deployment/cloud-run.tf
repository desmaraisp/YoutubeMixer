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
	  service_account_name = google_service_account.cloudrun-identity.email
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }
  }

  lifecycle {
	ignore_changes = [
	  template[0].spec[0].containers[0].image,
	  template[0].spec[0].containers[0].env
	]
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
  location    = google_cloud_run_service.nextjs-main.location
  project     = google_cloud_run_service.nextjs-main.project
  service     = google_cloud_run_service.nextjs-main.name

  policy_data = data.google_iam_policy.noauth.policy_data
}