namespace Randomizer.Api.Features.TrackWeightsApi.TrackWeightsService;

public interface ITrackWeightsService
{
	public Task UpdatePlayerWeightsCollection(string userId, Guid playerId, List<UpdateTrackWeightsCollectionDto> payload);
}