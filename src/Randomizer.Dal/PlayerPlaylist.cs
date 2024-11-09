using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Randomizer.Dal;

public enum RemotePlaylistType
{
	Youtube,
	Spotify
}

public class PlayerPlaylist
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public required int Id { get; init; }

	[Key]
	public required Guid PlaylistId { get; init; }

	public required string RemotePlaylistId { get; set; }
	public required RemotePlaylistType RemotePlaylistType { get; set; }
    public required string PlaylistName { get; set; }
	public bool IsEnabled { get; set; }

	[ForeignKey(nameof(Player))]
	public required Guid PlayerId { get; set; }
	public Player Player { get; set; } = null!;


	public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = [];
}