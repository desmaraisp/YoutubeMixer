[CmdletBinding()]
param (
	[Parameter(mandatory = $true)]
	[string]
	$MigrationName
)

Push-Location "$PSScriptRoot/../src/Randomizer.Api"

dotnet ef migrations add $MigrationName --project ../Randomizer.Dal.Migrations.SqlServer -- --DatabaseConfiguration:DatabaseProvider SqlServer
dotnet ef migrations add $MigrationName --project ../Randomizer.Dal.Migrations.Postgresql -- --DatabaseConfiguration:DatabaseProvider Postgresql

Pop-Location