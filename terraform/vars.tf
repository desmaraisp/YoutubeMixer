variable "region" {
  type    = string
  default = "us-central1"
}
variable "ProjectID" {
  type = string
}
variable "Image" {
  type = string
}
variable "DATABASE_URL" {
  type      = string
  sensitive = true
}
variable "SPOTIFY_CLIENT_ID" {
  type      = string
  sensitive = true
}
variable "SPOTIFY_CLIENT_SECRET" {
  type      = string
  sensitive = true
}
variable "PUBLIC_SUPABASE_URL" {
  type = string
}
variable "PUBLIC_SUPABASE_ANON_KEY" {
  type = string
}
