using Microsoft.EntityFrameworkCore;
using Randomizer.Dal;

namespace Randomizer.Api.Features.TrackWeightsApi.TrackWeightsService;

public class TrackWeightsService : ITrackWeightsService
{
	private readonly RandomizerContext context;

	public TrackWeightsService(RandomizerContext context)
	{
		this.context = context;
	}

	public async Task UpdatePlayerWeightsCollection(string userId, Guid playerId, List<UpdateTrackWeightsCollectionDto> payload)
	{
		var playerExists = await context.Players.AnyAsync(x => x.UserId == userId && x.PlayerId == playerId);

		if (!playerExists) throw new PlayerNotFoundException("Could not find the player associated to the track weights collection");
		var trackIds = payload.Select(x => x.TrackId).ToList();

		var existingWeights = await context.TrackWeights.Where(x => x.PlayerId == playerId && trackIds.Contains(x.Track.TrackId)).ToListAsync();
		if (existingWeights.Count != trackIds.Count)
		{
			throw new TrackNotFoundException("Could not replace the tracks collection due to one track not existing");
		}

		foreach (var weight in existingWeights)
		{
			weight.WeightValue = payload.First(x => x.TrackId == weight.TrackId).WeightValue;
		}

		await context.SaveChangesAsync();
	}
}