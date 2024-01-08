provider "google" {
  project               = "randomizer-410617"
  billing_project       = "randomizer-410617"
  region                = "us-central1"
  user_project_override = true
}

terraform {
  backend "local" {
  }
}
