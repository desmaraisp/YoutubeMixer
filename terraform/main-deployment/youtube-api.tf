resource "google_project_service" "youtube_api" {
  service = "youtube.googleapis.com"
}

resource "google_apikeys_key" "youtube" {
	name         = "youtube-api-key"
	display_name = "Youtube API key for Cloud Run service"

	restrictions {
		api_targets {
			service = "run.googleapis.com"
		}
	}
}