using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Randomizer.Dal;

namespace Randomizer.Features.Database;

public static class WebApplicationBuilderExtensions
{
	public static IHostApplicationBuilder RegisterDatabase(this IHostApplicationBuilder builder)
	{
		builder.Services.AddOptions<DatabaseOptions>()
				.BindConfiguration("DatabaseConfiguration");

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