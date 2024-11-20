using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Randomizer.Dal;

public class PlayerProgress
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; set; }

	[Key]
	public Guid PlayerProgressId { get; set; }

	[ForeignKey(nameof(CurrentTrack))]
	public Guid CurrentTrackId { get; set; }
	public PlaylistTrack CurrentTrack { get; set; } = null!;


	[ForeignKey(nameof(Player))]
	public Guid PlayerId { get; set; }
	public Player Player { get; set; } = null!;
}