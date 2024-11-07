resource "random_password" "migrations" {
  length  = 35
  special = true
}
resource "postgresql_role" "migrations_user" {
  login    = true
  name     = "migrations-user"
  password = random_password.migrations.result

  roles = [postgresql_role.private_role.name]
}

resource "postgresql_default_privileges" "migrations_all_rights_on_tables" {
  database = neon_project.default.database_name
  owner    = neon_project.default.database_user

  schema = postgresql_schema.private_schema.name

  privileges = [
    "DELETE",
    "INSERT",
    "REFERENCES",
    "SELECT",
    "TRIGGER",
    "TRUNCATE",
    "UPDATE"
  ]
  object_type = "table"
  role        = postgresql_role.migrations_user.name
}
