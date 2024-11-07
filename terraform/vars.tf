variable "GCPDefaultRegion" {
  type    = string
  default = "us-central1"
}
variable "GCPProjectId" {
  type = string
}
variable "Image" {
  type = string
}
variable "SPOTIFY_CLIENT_ID" {
  type      = string
  sensitive = true
}
variable "SPOTIFY_CLIENT_SECRET" {
  type      = string
  sensitive = true
}
variable "EnvironmentName" {
  type = string
}