provider "google-beta" {
  project = var.GCP_PROJECT_ID
  region  = var.GCP_REGION
}

terraform {
  cloud {
    organization = "desmaraisp-org"
    workspaces {
      name = "randomizer-workspace"
    }
  }

  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "4.68.0"
    }
  }
}
