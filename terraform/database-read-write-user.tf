resource "random_password" "read_write_user" {
  length  = 35
  special = true
}
resource "postgresql_role" "read_write_user" {
  login                     = true

  name     = "read-write-user"
  password = random_password.read_write_user.result
  roles = [ postgresql_role.private_role.name ]
}

resource "postgresql_default_privileges" "read_write_only_updates" {
  database = neon_project.default.database_name
  owner    = neon_project.default.database_user

  schema = postgresql_schema.private_schema.name

  privileges  = ["UPDATE"]
  object_type = "table"
  role        = postgresql_role.read_write_user.name
}
