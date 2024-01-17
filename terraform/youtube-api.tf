resource "google_apikeys_key" "youtube2" {
  name         = "youtube-api-key2"
  display_name = "Youtube API key for Cloud Run service"

  restrictions {
    api_targets {
      service = "youtube.googleapis.com"
    }
  }
}
