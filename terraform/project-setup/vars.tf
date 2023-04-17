variable "region" {
  type    = string
  default = "us-central1"
}

variable "ProjectID" {
	type = string
}

variable "gcp_service_list" {
  description ="The list of apis necessary for the setup"
  type = list(string)
  default = [
	"iam.googleapis.com",
	"cloudresourcemanager.googleapis.com",
	"iamcredentials.googleapis.com",
	"sts.googleapis.com",
	"storage.googleapis.com"
  ]
}
