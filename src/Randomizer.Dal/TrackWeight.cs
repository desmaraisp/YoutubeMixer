using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Randomizer.Dal;

public class TrackWeight
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; set; }

	[Key]
	public Guid WeightId { get; set; }

	public float WeightValue { get; set; }

	[ForeignKey(nameof(Track))]
	public Guid TrackId { get; set; }
	public PlaylistTrack Track { get; set; } = null!;
}