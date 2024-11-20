using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Randomizer.Dal;

namespace Randomizer.Api.Features.DatabaseRegistration;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder RegisterDatabase(this WebApplicationBuilder builder)
	{
		builder.Services.AddOptions<DatabaseOptions>()
				.BindConfiguration("DatabaseConfiguration")
				.ValidateDataAnnotations()
				.ValidateOnStart();

		builder.Services.AddDbContext<RandomizerContext>((sp, c) =>
		{
			var options = sp.GetRequiredService<IOptions<DatabaseOptions>>().Value;
			string? connectionString = builder.Configuration.GetConnectionString(nameof(RandomizerContext));

			c = options.DatabaseProvider switch
			{
				DatabaseType.SqlServer => c.UseSqlServer(connectionString, y =>
				{
					y.MigrationsAssembly("Randomizer.Dal.Migrations.SqlServer");
				}),
				DatabaseType.PostgreSQl => c.UseNpgsql(connectionString, y =>
				{
					y.MigrationsAssembly("Randomizer.Dal.Migrations.Postgresql");
				}),
				_ => throw new InvalidOperationException("Unrecognized database type"),
			};
		});
		return builder;
	}
}