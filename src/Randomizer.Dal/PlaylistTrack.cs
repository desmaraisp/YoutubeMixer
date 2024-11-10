using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Randomizer.Dal;

public class PlaylistTrack
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; init; }

	[Key]
	public Guid TrackId { get; init; }
	public required string RemoteTrackId { get; set; }
	public required string TrackName { get; set; }

	public TrackWeight? TrackWeight { get; set; }


	[ForeignKey(nameof(Playlist))]
	public Guid PlaylistId { get; set; }
	public PlayerPlaylist Playlist { get; set; } = null!;
}