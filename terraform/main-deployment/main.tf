provider "google-beta" {
  project = var.ProjectID
  region  = var.region
}

terraform {
 backend "gcs" {
   bucket  = "b855b462c9df25fc-bucket-tfstate"
   prefix  = "terraform/state"
 }
}
