using System.ComponentModel.DataAnnotations;

namespace Randomizer.Api.Features.DatabaseRegistration;

public enum DatabaseType {
	SqlServer,
	PostgreSQl
}

public record class DatabaseOptions
{
	public DatabaseType DatabaseProvider { get; init; }
}