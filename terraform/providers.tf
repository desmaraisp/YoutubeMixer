provider "google" {
  project               = var.ProjectID
  billing_project       = var.ProjectID
  region                = var.region
  user_project_override = true
}

terraform {
  backend "remote" {
    hostname     = "desmaraisp.scalr.io"
    organization = "YoutubeRandomizer"
    workspaces {
      name = "prod"
    }
  }
}
