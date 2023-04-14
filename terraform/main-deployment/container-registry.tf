# resource "google_project_service" "container_registry" {
#   service    = "containerregistry.googleapis.com"
#   disable_dependent_services = true
#   disable_on_destroy = true
# }

# resource "google_container_registry" "main" {

# }