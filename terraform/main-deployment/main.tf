provider "google" {
  project = var.ProjectID
  region  = var.region
}

# resource "google_project_service" "gcp_services" {
#   for_each = toset(var.gcp_service_list)
#   service = each.key
# }