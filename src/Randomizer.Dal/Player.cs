using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Randomizer.Dal;

[Index(nameof(PlayerName), nameof(UserId), IsUnique = true)]
public class Player
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; init; }

	[Key]
	public Guid PlayerId { get; init; }

	[StringLength(100)]
	public required string UserId { get; set; }

	[StringLength(100)]
	public required string PlayerName { get; set; }

	public ICollection<PlayerPlaylist> Playlists { get; set; } = [];

	public PlayerProgress? PlayerProgress { get; set; }
}