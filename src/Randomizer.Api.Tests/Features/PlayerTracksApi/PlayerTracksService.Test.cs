using Randomizer.Api.Features.PlayerTracksApi.PlayerTracksService;
using Randomizer.Dal;

namespace Randomizer.Api.Tests.Features.PlayerTracksApi;

[TestClass]
public class PlayerTracksServiceTests
{
	private readonly RandomizerContext context;
	private readonly IPlayerTracksService service;
	public PlayerTracksServiceTests()
	{
		context = ConfigureSqLite.ConfigureRandomizerContext();
		service = new PlayerTracksService(context);
	}


	[TestMethod]
	public async Task GetPlayerTracks_ShouldReturn()
	{
		Guid trackId = Guid.NewGuid();
		var entity = context.Players.Add(new()
		{
			PlayerName = "test",
			UserId = "User",
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
							TrackId = trackId,
							TrackWeight = new()
							{
								WeightValue = .5f,
							}
						}
					]
				}
			]
		});

		await context.SaveChangesAsync();

		var res = await service.GetPlayerTracks("User", entity.Entity.PlayerId);
		Assert.AreEqual(1, res.Count);
		Assert.AreEqual(new GetPlayerTracksDto
		{
			RemoteTrackId = "remoteTrackId",
			TrackId = trackId,
			TrackName = "trackName",
			TrackType = MusicProvider.Spotify,
			TrackWeight = 0.5f
		}, res.Single());
	}

	[TestMethod]
	public async Task GetPlayerTracks_ShouldReturnOrdered()
	{
		var entity = context.Players.Add(new()
		{
			PlayerName = "test",
			UserId = "User",
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
							}
						},
						new PlaylistTrack
						{
							RemoteTrackId = "remoteTrackId2",
							TrackName = "trackName2",
							TrackWeight = new()
							{
								WeightValue = .6f,
							}
						}
					]
				},
				new PlayerPlaylist
				{
					PlaylistName = "",
					RemotePlaylistId = "",
					RemotePlaylistType = MusicProvider.Youtube,
					PlaylistTracks = [
						new PlaylistTrack
						{
							RemoteTrackId = "remoteTrackId3",
							TrackName = "trackName3",
							TrackWeight = new()
							{
								WeightValue = .4f,
							}
						}
					]
				}
			]
		});

		await context.SaveChangesAsync();

		var res = await service.GetPlayerTracks("User", entity.Entity.PlayerId);
		Assert.AreEqual(3, res.Count);
		Assert.AreEqual("remoteTrackId3", res.First().RemoteTrackId);
		Assert.AreEqual("trackName3", res.First().TrackName);
		Assert.AreEqual(MusicProvider.Youtube, res.First().TrackType);

		Assert.AreEqual("remoteTrackId", res[1].RemoteTrackId);
		Assert.AreEqual("trackName", res[1].TrackName);
		Assert.AreEqual(MusicProvider.Spotify, res[1].TrackType);
	}

	[TestMethod]
	public async Task GetPlayerTracks_ShouldReturnNone_WhenUserDifferent()
	{
		Guid trackId = Guid.NewGuid();
		var entity = context.Players.Add(new()
		{
			PlayerName = "test",
			UserId = "User",
			Playlists = [
				new PlayerPlaylist
				{
					PlaylistName = "",
					RemotePlaylistId = "",
					RemotePlaylistType = MusicProvider.Spotify,
					PlaylistTracks = [
						new PlaylistTrack
						{
							RemoteTrackId = "",
							TrackName = "",
							TrackId = trackId,
							TrackWeight = new()
							{
								WeightValue = .5f,
							}
						}
					]
				}
			]
		});

		await context.SaveChangesAsync();

		var res = await service.GetPlayerTracks("AnotherUser", entity.Entity.PlayerId);
		Assert.AreEqual(0, res.Count);
	}

	[TestMethod]
	public async Task GetPlayerTracks_ShouldReturnNone_WhenDisabled()
	{
		Guid trackId = Guid.NewGuid();
		var entity = context.Players.Add(new()
		{
			PlayerName = "test",
			UserId = "User",
			Playlists = [
				new PlayerPlaylist
				{
					IsDisabled = true,
					PlaylistName = "",
					RemotePlaylistId = "",
					RemotePlaylistType = MusicProvider.Spotify,
					PlaylistTracks = [
						new PlaylistTrack
						{
							RemoteTrackId = "",
							TrackName = "",
							TrackId = trackId,
							TrackWeight = new()
							{
								WeightValue = .5f,
							}
						}
					]
				}
			]
		});

		await context.SaveChangesAsync();

		var res = await service.GetPlayerTracks("User", entity.Entity.PlayerId);
		Assert.AreEqual(0, res.Count);
	}
}