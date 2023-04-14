provider "google" {
  project = var.ProjectID
  region  = var.region
}

terraform {
 backend "gcs" {
   bucket  = "4b65166a39606ce4-bucket-tfstate"
   prefix  = "terraform/state"
 }
}

# resource "google_project_service" "gcp_services" {
#   for_each = toset(var.gcp_service_list)
#   service = each.key
# }