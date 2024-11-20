using Microsoft.EntityFrameworkCore;
using Randomizer.Api.Features.PlayersApi.PlayersService;
using Randomizer.Dal;

namespace Randomizer.Api.Tests.Features.PlayersApi;

[TestClass]
public class PlayerServiceTests
{
	private readonly RandomizerContext context;
	private readonly IPlayersService service;

	public PlayerServiceTests()
	{
		context = ConfigureSqLite.ConfigureRandomizerContext();
		service = new PlayersService(context);
	}

	[TestMethod]
	public async Task CreateNewPlayer_ShouldAddPlayerToDatabase()
	{
		var userId = "test_user";
		var playerName = "Test Player";

		// Act
		var result = await service.CreateNewPlayer(userId, playerName);

		// Assert
		var playerInDb = await context.Players.FirstOrDefaultAsync(p => p.UserId == userId);
		Assert.IsNotNull(playerInDb, "Player should be added to the database.");
		Assert.AreEqual(
			playerName,
			playerInDb.PlayerName,
			"PlayerName should match the input."
		);
		Assert.AreEqual(playerName, result.PlayerName, "PlayerName should match the input.");
		Assert.AreEqual(userId, playerInDb.UserId, "UserId should match the input.");

		// Assuming no playlists are created, so counts should be zero
		Assert.AreEqual(
			0,
			result.PlaylistsCount,
			"PlaylistsCount should be zero for a new player with no playlists."
		);
		Assert.AreEqual(
			0,
			result.TracksCount,
			"TracksCount should be zero for a new player with no tracks."
		);

		Assert.AreEqual(playerInDb.PlayerId, result.PlayerId);
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerNameAlreadyUsedException))]
	public async Task CreateNewPlayer_ShouldThrow_IfNameDuplicate()
	{
		var userId = "test_user";
		var playerName = "Test Player";
		context.Players.Add(new() { PlayerName = playerName, UserId = userId });
		await context.SaveChangesAsync();

		await service.CreateNewPlayer(userId, playerName);
	}

	[TestMethod]
	public async Task DeletePlayer_ShouldSucceed()
	{
		var userId = "test_user";
		var playerName = "Test Player";
		var entity = context.Players.Add(new() { PlayerName = playerName, UserId = userId });
		await context.SaveChangesAsync();

		await service.DeletePlayer(userId, entity.Entity.PlayerId);

		Assert.AreEqual(0, await context.Players.AsNoTracking().CountAsync());
	}

	[TestMethod]
	public async Task FindPlayer_ShouldSucceed()
	{
		var userId = "test_user";
		var playerName = "Test Player";
		var entity = context.Players.Add(
			new()
			{
				PlayerName = playerName,
				UserId = userId,
				Playlists =
				[
					new PlayerPlaylist
					{
						PlaylistName = "TestPlaylist",
						RemotePlaylistType = MusicProvider.Youtube,
						RemotePlaylistId = "",
						PlaylistTracks =
						[
							new PlaylistTrack { TrackName = "Test track", RemoteTrackId = "" },
						],
					},
				],
			}
		);
		await context.SaveChangesAsync();

		var result = await service.FindPlayer(userId, entity.Entity.PlayerId);

		Assert.IsNotNull(result);
		Assert.AreEqual(playerName, result.PlayerName);
		Assert.AreEqual(entity.Entity.PlayerId, result.PlayerId);
		Assert.AreEqual(1, result.PlaylistsCount);
		Assert.AreEqual(1, result.TracksCount);
	}

	[TestMethod]
	public async Task FindPlayer_ShouldReturnNull_WhenUserIdNotMatch()
	{
		var userId = "test_user";
		var playerName = "Test Player";
		var entity = context.Players.Add(new() { PlayerName = playerName, UserId = userId });
		await context.SaveChangesAsync();

		var result = await service.FindPlayer("another user Id", entity.Entity.PlayerId);

		Assert.IsNull(result);
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerNotFoundException))]
	public async Task GetPlayer_ShouldThrow()
	{
		await service.GetPlayer("another user Id", Guid.NewGuid());
	}

	[TestMethod]
	public async Task GetPlayers_ShouldReturnTwo()
	{
		context.Players.AddRange(
			[
				new Player { PlayerName = "Test Player", UserId = "test_user" },
				new Player { PlayerName = "Test Player2", UserId = "test_user2" },
				new Player
				{
					PlayerName = "Test Player2",
					UserId = "test_user",
					Playlists =
					[
						new PlayerPlaylist
						{
							PlaylistName = "",
							RemotePlaylistId = "",
							RemotePlaylistType = MusicProvider.Spotify,
						},
					],
				},
			]
		);
		await context.SaveChangesAsync();

		var result = await service.GetUserPlayers("test_user");

		Assert.IsNotNull(result);
		Assert.AreEqual(2, result.Count);
		Assert.IsTrue(result.Any(x => x.PlaylistsCount == 1));
		Assert.AreEqual(1, result.Count(x => x.PlayerName == "Test Player2"));
	}

	[TestMethod]
	public async Task UpdatePlayerName_ShouldSucceed()
	{
		var userId = "test_user";
		var playerName = "Test Player";
		var entity = context.Players.Add(new() { PlayerName = playerName, UserId = userId });
		await context.SaveChangesAsync();

		await service.UpsertPlayer("test_user", entity.Entity.PlayerId, "New player name");

		await entity.ReloadAsync();
		Assert.AreEqual("New player name", entity.Entity.PlayerName);
	}

	[TestMethod]
	public async Task UpdatePlayerName_ShouldCreate_IfNotFound()
	{
		var guid = Guid.NewGuid();
		var res = await service.UpsertPlayer("test_user", guid, "New player name");

		Assert.IsNotNull(res);
		Assert.AreEqual("test_user", res.UserId);
		Assert.AreEqual("New player name", res.PlayerName);

		var entity = await context.Players.FirstOrDefaultAsync();
		Assert.IsNotNull(entity);
		Assert.AreEqual(guid, entity.PlayerId);
		Assert.AreEqual("New player name", entity.PlayerName);
	}

	[TestMethod]
	public async Task UpdatePlayerName_ShouldSucceed_IfNameUnchanged()
	{
		var entity = context.Players.Add(
			new Player { PlayerName = "New player name", UserId = "test_user" }
		);
		await context.SaveChangesAsync();

		var result = await service.UpsertPlayer(
			"test_user",
			entity.Entity.PlayerId,
			"New player name"
		);

		await entity.ReloadAsync();

		Assert.AreEqual("New player name", result.PlayerName);
		Assert.AreEqual("New player name", entity.Entity.PlayerName);
	}

	[TestMethod]
	[ExpectedException(typeof(PlayerNameAlreadyUsedException))]
	public async Task UpdatePlayerName_ShouldThrow_IfNameAlreadyExistOnAnotherEntity()
	{
		Guid guid = Guid.NewGuid();
		context.Players.AddRange(
			[
				new Player
				{
					PlayerId = guid,
					PlayerName = "Test Player",
					UserId = "test_user",
				},
				new Player { PlayerName = "New player name", UserId = "test_user" },
			]
		);
		await context.SaveChangesAsync();

		await service.UpsertPlayer("test_user", guid, "New player name");
	}
}