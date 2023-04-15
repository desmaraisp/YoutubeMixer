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

resource "google_firebaserules_ruleset" "primary" {
  provider = google-beta


  source {
    files {
      content = <<EOF
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /Authorizations {
    	allow read, update, delete, create: if false
    }
  	
    match /{collection}/{userId} {
      allow read, update, delete, create: if request.auth != null && request.auth.uid == userId;
    }
  }
}
EOF
      name    = "firestore.rules"
    }
  }

  depends_on = [
	google_firestore_database.database
  ]
}

resource "google_firebaserules_release" "primary" {
  name         = "release"
  ruleset_name = google_firebaserules_ruleset.primary.name
}
