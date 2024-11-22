namespace Randomizer.Features.Database;

public enum DatabaseType
{
	SqlServer,
	PostgreSQl
}

public record class DatabaseOptions
{
	public DatabaseType DatabaseProvider { get; init; }
}