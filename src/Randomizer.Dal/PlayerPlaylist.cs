using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Randomizer.Dal;

public class PlayerPlaylist
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; init; }

	[Key]
	public Guid PlaylistId { get; init; }

	public required string RemotePlaylistId { get; set; }
	public required MusicProvider RemotePlaylistType { get; set; }
    public required string PlaylistName { get; set; }
	public bool IsDisabled { get; set; }

	[ForeignKey(nameof(Player))]
	public Guid PlayerId { get; set; }
	public Player Player { get; set; } = null!;


	public ICollection<PlaylistTrack> PlaylistTracks { get; set; } = [];
}