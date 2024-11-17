namespace Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

public interface IPlayerProgressService
{
	public Task<GetCurrentTrackDto?> GetCurrentTrack(string UserId, Guid PlayerId);
	public Task<GetCurrentTrackDto> SetCurrentTrack(string UserId, Guid PlayerId, Guid CurrentTrackId);
}