namespace Randomizer.Api.Features.PlayerTracksApi.PlayerTracksService;

public interface IPlayerTracksService
{
	public Task<List<GetPlayerTracksDto>> GetPlayerTracks(string UserId, Guid PlayerId);
}