resource "postgresql_schema" "private_schema" {
  database = neon_project.default.database_name
  name     = "private"
}
resource "random_password" "private_role" {
  length  = 35
  special = true
}
resource "postgresql_role" "private_role" {
  login = true
  password = random_password.private_role.result
  name = "private"
}

resource "postgresql_grant" "private_role_can_use_private_schema" {
  database = neon_project.default.database_name

  role        = postgresql_role.private_role.name
  schema      = postgresql_schema.private_schema.name
  object_type = "schema"
  privileges  = ["USAGE"]
}

