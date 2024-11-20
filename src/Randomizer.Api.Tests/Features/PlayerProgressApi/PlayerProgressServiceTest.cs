using Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;
using Randomizer.Dal;

namespace Randomizer.Api.Tests.Features.PlayerProgressApi;

[TestClass]
public class PlayerProgressServiceTest
{
	private readonly RandomizerContext context;
	private readonly IPlayerProgressService service;
	private readonly Guid trackId = Guid.NewGuid();
	private readonly Guid playerId = Guid.NewGuid();
	private readonly string userId = "user";
	private readonly Player player;
	public PlayerProgressServiceTest()
	{
		context = ConfigureSqLite.ConfigureRandomizerContext();
		service = new PlayerProgressService(context);
		player = new()
		{
			PlayerName = "",
			PlayerId = playerId,
			UserId = userId,
			Playlists = [
				new PlayerPlaylist
				{
					PlaylistName = "",
					RemotePlaylistId = "",
					RemotePlaylistType = MusicProvider.Youtube,
					PlaylistTracks = [
						new PlaylistTrack
						{
							RemoteTrackId = "1",
							TrackName = "1",
							TrackId = trackId
						},
						new PlaylistTrack
						{
							RemoteTrackId = "2",
							TrackName = "2",
							TrackId = Guid.NewGuid()
						}
					]
				}
			]
		};
	}

	[TestMethod]
	public async Task GetPlayerProgress_ShouldReturn()
	{
		context.Players.Add(player);
		context.PlayerProgresses.Add(new()
		{
			PlayerId = playerId,
			CurrentTrackId = trackId
		});
		await context.SaveChangesAsync();

		var res = await service.GetCurrentTrack(userId, playerId);

		Assert.IsNotNull(res);
		Assert.AreEqual(trackId, res.CurrentTrackId);
		Assert.AreEqual(playerId, res.PlayerId);
	}

	[TestMethod]
	public async Task GetPlayerProgress_ShouldReturnNull_WhenWrongUserId()
	{
		context.Players.Add(player);
		context.PlayerProgresses.Add(new()
		{
			PlayerId = playerId,
			CurrentTrackId = trackId
		});
		await context.SaveChangesAsync();

		var res = await service.GetCurrentTrack("AnotherUserId", playerId);

		Assert.IsNull(res);
	}
	[TestMethod]
	public async Task GetPlayerProgress_ShouldReturnNull_WhenWrongPlayerId()
	{
		context.Players.Add(player);
		context.PlayerProgresses.Add(new()
		{
			PlayerId = playerId,
			CurrentTrackId = trackId
		});
		await context.SaveChangesAsync();

		var res = await service.GetCurrentTrack(userId, Guid.NewGuid());

		Assert.IsNull(res);
	}

	[TestMethod]
	public async Task SetCurrentTrack_ShouldInsert()
	{
		context.Players.Add(player);
		await context.SaveChangesAsync();

		var res = await service.SetCurrentTrack(userId, playerId, trackId);

		Assert.IsNotNull(res);
		Assert.AreEqual(trackId, res.CurrentTrackId);
		Assert.AreEqual(playerId, res.PlayerId);
	}

	[TestMethod]
	public async Task SetCurrentTrack_ShouldReplace()
	{
		context.Players.Add(player);
		context.PlayerProgresses.Add(new()
		{
			PlayerId = playerId,
			CurrentTrackId = player.Playlists.First().PlaylistTracks.ElementAt(1).TrackId
		});

		await context.SaveChangesAsync();

		var res = await service.SetCurrentTrack(userId, playerId, trackId);

		Assert.IsNotNull(res);
		Assert.AreEqual(trackId, res.CurrentTrackId);
		Assert.AreEqual(playerId, res.PlayerId);
	}


	[TestMethod]
	[ExpectedException(typeof(PlayerNotFoundException))]
	public async Task SetCurrentTrack_ShouldThrow_WhenWrongUser()
	{
		context.Players.Add(player);
		await context.SaveChangesAsync();

		await service.SetCurrentTrack("", playerId, trackId);
	}
	[TestMethod]
	[ExpectedException(typeof(PlayerNotFoundException))]
	public async Task SetCurrentTrack_ShouldThrow_WhenWrongPlayerId()
	{
		context.Players.Add(player);
		await context.SaveChangesAsync();

		await service.SetCurrentTrack(userId, Guid.NewGuid(), trackId);
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerTrackNotFoundException))]
	public async Task SetCurrentTrack_ShouldThrow_WhenWrongTrackId()
	{
		context.Players.Add(player);
		await context.SaveChangesAsync();

		await service.SetCurrentTrack(userId, playerId, Guid.NewGuid());
	}


}