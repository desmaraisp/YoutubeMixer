using Microsoft.EntityFrameworkCore;

namespace Randomizer.Dal;

public class RandomizerContext(DbContextOptions<RandomizerContext> options) : DbContext(options)
{
	public DbSet<Player> Players { get; set; } = null!;
	public DbSet<PlayerPlaylist> Playlists { get; set; } = null!;
	public DbSet<PlaylistTrack> PlaylistTracks { get; set; } = null!;
	public DbSet<TrackWeight> TrackWeights { get; set; } = null!;
	public DbSet<PlayerProgress> PlayerProgresses { get; set; } = null!;

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Player>(c =>
		{
			c.HasIndex(x => x.Id).IsClustered(true);
			c.HasKey(x => x.PlayerId).IsClustered(false);
		});
		modelBuilder.Entity<PlayerPlaylist>(c =>
		{
			c.HasIndex(x => x.Id).IsClustered(true);
			c.HasKey(x => x.PlaylistId).IsClustered(false);
		});
		modelBuilder.Entity<PlaylistTrack>(c =>
		{
			c.HasIndex(x => x.Id).IsClustered(true);
			c.HasKey(x => x.TrackId).IsClustered(false);
		});
		modelBuilder.Entity<TrackWeight>(c =>
		{
			c.HasIndex(x => x.Id).IsClustered(true);
			c.HasKey(x => x.WeightId).IsClustered(false);
		});
		modelBuilder.Entity<PlayerProgress>(c =>
		{
			c.HasIndex(x => x.Id).IsClustered(true);
			c.HasKey(x => x.PlayerProgressId).IsClustered(false);
		});
	}
}