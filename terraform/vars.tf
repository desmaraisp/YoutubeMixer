variable "GCP_REGION" {
  type    = string
  default = "us-east1"
}
variable "GCP_PROJECT_ID" {
	type = string
}
variable "IMAGE" {
  type = string
}
variable "GOOGLE_CLIENT_ID" {
	type = string
	sensitive = true
}
variable "GOOGLE_CLIENT_SECRET" {
	type = string
	sensitive = true
}
variable "SPOTIFY_CLIENT_ID" {
	type = string
	sensitive = true
}
variable "SPOTIFY_CLIENT_SECRET" {
	type = string
	sensitive = true
}