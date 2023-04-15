resource "google_project_service" "firestore" {
  provider = google-beta
  service = "firestore.googleapis.com"
  depends_on = [
	google_firebase_project.default
  ]
}

resource "google_firestore_database" "database" {
  provider = google-beta
  name                        = "(default)"
  location_id                 = "nam5"
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"

  depends_on = [google_project_service.firestore]
}