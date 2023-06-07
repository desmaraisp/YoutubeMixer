resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
  depends_on = [
	google_firebase_project.default
  ]
}

resource "google_firestore_database" "database" {
  name                        = "(default)"
  location_id                 = "nam5"
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"

  depends_on = [google_project_service.firestore]
}
resource "google_firebaserules_ruleset" "firestore" {
  source {
    files {
      name = "firestore.rules"
      content = <<EOT
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Player/{userId} {
      allow read, update, delete, create: if request.auth != null && request.auth.uid == userId;
    }
    match /Playlists/{userId} {
      allow read, update, delete, create: if request.auth != null && request.auth.uid == userId;
    }

  }
}
EOT
    }
  }

  depends_on = [
	google_firestore_database.database
  ]
}

resource "google_firebaserules_release" "firestore" {
  name         = "cloud.firestore"
  ruleset_name = google_firebaserules_ruleset.firestore.name
}