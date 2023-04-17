data "google_firebase_web_app_config" "basic" {
  provider = google-beta
  web_app_id = google_firebase_web_app.default.app_id
}

locals {
	build-time-env-content = <<EOT
NEXT_PUBLIC_ApiKey="${data.google_firebase_web_app_config.basic.api_key}"
NEXT_PUBLIC_AuthDomain="${data.google_firebase_web_app_config.basic.auth_domain}"
NEXT_PUBLIC_ProjectId="${var.ProjectID}"
NEXT_PUBLIC_StorageBucket="${data.google_firebase_web_app_config.basic.storage_bucket}"
NEXT_PUBLIC_MessagingSenderId="${data.google_firebase_web_app_config.basic.messaging_sender_id}"
NEXT_PUBLIC_AppId="${data.google_firebase_web_app_config.basic.web_app_id}"
EOT
}

resource "local_file" "firebase_config" {
  content = local.build-time-env-content
  filename = "${path.cwd}/.env.production"
}

output "Youtube_API_Key" {
  value = google_apikeys_key.youtube.key_string
  sensitive = true
}
