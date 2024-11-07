resource "neon_project" "default" {
  name = "${var.EnvironmentName}-randomizer-data-db"
  history_retention_seconds = 0

  default_endpoint_settings {
    autoscaling_limit_min_cu = 0.25
    autoscaling_limit_max_cu = 0.5
  }
}
