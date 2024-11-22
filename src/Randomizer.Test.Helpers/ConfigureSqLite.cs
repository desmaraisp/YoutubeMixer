using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Logging;
using Randomizer.Dal;


namespace Randomizer.Test.Helpers;

public static class ConfigureSqLite
{
	private readonly static ILoggerFactory fact = LoggerFactory.Create(x => x.AddConsole());
	public static RandomizerContext ConfigureRandomizerContext()
	{
		SqliteConnection connection = CreateConnection();

		DbContextOptions<RandomizerContext> contextOptions = new DbContextOptionsBuilder<RandomizerContext>()
			.UseLoggerFactory(fact)
			.UseSqlite(connection)
			.ReplaceService<IModelCustomizer, SqliteModelCustomizer>()
			.Options;

		var randomizerContext = new RandomizerContext(contextOptions);
		randomizerContext.Database.EnsureCreated();
		return randomizerContext;
	}

	private static SqliteConnection CreateConnection()
	{
		SqliteConnection connection = new("Filename=:memory:");
		connection.Open();
		return connection;
	}
}

internal class SqliteModelCustomizer : IModelCustomizer
{
	public void Customize(ModelBuilder modelBuilder, DbContext context)
	{
		modelBuilder.Entity<Player>(c =>
		{
			c.Property(x => x.Id).ValueGeneratedNever();
		});
		modelBuilder.Entity<PlayerPlaylist>(c =>
		{
			c.Property(x => x.Id).ValueGeneratedNever();
		});
		modelBuilder.Entity<PlaylistTrack>(c =>
		{
			c.Property(x => x.Id).ValueGeneratedNever();
		});
		modelBuilder.Entity<TrackWeight>(c =>
		{
			c.Property(x => x.Id).ValueGeneratedNever();
		});
		modelBuilder.Entity<PlayerProgress>(c =>
		{
			c.Property(x => x.Id).ValueGeneratedNever();
		});
	}
}