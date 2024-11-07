terraform {
  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "1.24.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.6.3"
    }

    neon = {
      source  = "kislerdm/neon"
      version = "0.6.3"
    }
    google = {
      source  = "hashicorp/google"
      version = "6.10.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "6.10.0"
    }
  }
}


provider "google" {
  project               = var.GCPProjectId
  billing_project       = var.GCPProjectId
  region                = var.GCPDefaultRegion
  user_project_override = true
}
provider "google-beta" {
  project               = var.GCPProjectId
  billing_project       = var.GCPProjectId
  region                = var.GCPDefaultRegion
  user_project_override = true
}
provider "neon" {

}

provider "postgresql" {
  host      = neon_project.default.database_host
  database  = neon_project.default.database_name
  username  = neon_project.default.database_user
  password  = neon_project.default.database_password
  sslmode   = "require"
  superuser = false
}

terraform {
  backend "remote" {}
}
