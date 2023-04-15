provider "google" {
  project = var.ProjectID
  region  = var.region
}
provider "google-beta" {
  project = var.ProjectID
  region  = var.region
}

terraform {
 backend "gcs" {
   bucket  = "4b65166a39606ce4-bucket-tfstate"
   prefix  = "terraform/state"
 }
}
