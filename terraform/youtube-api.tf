resource "google_project_service" "youtube_api" {
  service = "youtube.googleapis.com"
}

resource "google_project_service" "api-keys" {
  service = "apikeys.googleapis.com"
}


resource "google_apikeys_key" "youtube" {
	name         = "youtube-api-key"
	display_name = "Youtube API key for Cloud Run service"

	restrictions {
		api_targets {
			service = "youtube.googleapis.com"
		}
	}

	depends_on = [
	  google_project_service.api-keys,
	  google_project_service.youtube_api
	]
}