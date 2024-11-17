namespace Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

public class GetCurrentTrackDto {
	public required Guid CurrentTrackId { get; init; }
	public required Guid PlayerId { get; init;}
}