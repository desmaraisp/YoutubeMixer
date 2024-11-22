using Microsoft.EntityFrameworkCore;
using Randomizer.Api.Features.TrackWeightsApi.TrackWeightsService;
using Randomizer.Dal;
using Randomizer.Test.Helpers;

namespace Randomizer.Api.Tests.Features.TrackWeightsApi;

[TestClass]
public class TrackWeightsServiceTests
{
	private readonly RandomizerContext context;
	private readonly TrackWeightsService service;
	public TrackWeightsServiceTests()
	{
		context = ConfigureSqLite.ConfigureRandomizerContext();
		service = new TrackWeightsService(context);
		player = new()
		{
			PlayerName = "test",
			UserId = "User",
			PlayerId = playerId,
			Playlists = [
				new PlayerPlaylist
				{
					PlaylistName = "",
					RemotePlaylistId = "",
					RemotePlaylistType = MusicProvider.Spotify,
					PlaylistTracks = [
						new PlaylistTrack
						{
							RemoteTrackId = "remoteTrackId",
							TrackName = "trackName",
							TrackWeight = new()
							{
								WeightValue = .5f,
								PlayerId = playerId
							}
						},
						new PlaylistTrack
						{
							RemoteTrackId = "remoteTrackId2",
							TrackName = "trackName2",
							TrackWeight = new()
							{
								WeightValue = .5f,
								PlayerId = playerId
							}
						}
					]
				}
			]
		};
	}
	private readonly Guid playerId = Guid.NewGuid();
	private readonly Player player;

	[TestMethod]
	public async Task UpdatePlayerWeightsCollection_ShouldReplaceCollection()
	{
		var entity = context.Players.Add(player);

		await context.SaveChangesAsync();
		await service.UpdatePlayerWeightsCollection("User", entity.Entity.PlayerId, [
			new()
			{
				TrackId = player.Playlists.Single().PlaylistTracks.First().TrackId,
				WeightValue = 10f
			},
			new()
			{
				TrackId = player.Playlists.Single().PlaylistTracks.ElementAt(1).TrackId,
				WeightValue = 15f
			}

		]);

		var entities = await context.TrackWeights.ToListAsync();
		Assert.AreEqual(2, entities.Count);
		Assert.AreEqual(1, entities.Count(x => x.WeightValue == 10f && x.TrackId == player.Playlists.Single().PlaylistTracks.First().TrackId));
		Assert.AreEqual(1, entities.Count(x => x.WeightValue == 15f && x.TrackId == player.Playlists.Single().PlaylistTracks.ElementAt(1).TrackId));
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerNotFoundException))]
	public async Task UpdatePlayerWeightsCollection_ShouldThrow_IfWrongUser()
	{
		var entity = context.Players.Add(player);

		await context.SaveChangesAsync();
		await service.UpdatePlayerWeightsCollection("User2", entity.Entity.PlayerId, []);
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerNotFoundException))]
	public async Task UpdatePlayerWeightsCollection_ShouldThrow_IfWrongPlayerId()
	{
		context.Players.Add(player);

		await context.SaveChangesAsync();
		await service.UpdatePlayerWeightsCollection("User", Guid.NewGuid(), []);
	}

	[TestMethod]
	[ExpectedException(typeof(TrackNotFoundException))]
	public async Task UpdatePlayerWeightsCollection_ShouldThrow_IfWrongTrackId()
	{
		var entity = context.Players.Add(player);

		await context.SaveChangesAsync();
		await service.UpdatePlayerWeightsCollection("User", entity.Entity.PlayerId, [new()
		{
			TrackId = Guid.NewGuid(),
			WeightValue = 1f
		}]);
	}

}