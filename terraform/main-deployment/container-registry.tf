resource "google_project_service" "container_registry" {
  service    = "artifactregistry.googleapis.com"
}

resource "google_artifact_registry_repository" "registry" {
	repository_id = "nextjs-main"
	location = var.region
	format = "DOCKER"
	
	depends_on = [
	  google_project_service.container_registry
	]
}