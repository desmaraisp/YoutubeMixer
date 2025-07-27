using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Randomizer.Dal;

namespace Randomizer.Features.Players.Api.PlayersService;

public class PlayersService : IPlayersService
{
	private readonly RandomizerContext randomizerContext;

	public PlayersService(RandomizerContext randomizerContext)
	{
		this.randomizerContext = randomizerContext;
	}
	private static readonly Expression<Func<Player, GetPlayerDto>> PlayerProjectionExpression = player => new()
	{
		PlayerId = player.PlayerId,
		PlayerName = player.PlayerName,
		UserId = player.UserId,
		PlaylistsCount = player.Playlists.Count(),
		TracksCount = player.Playlists.Sum(y => y.PlaylistTracks.Count)
	};
	private static readonly Func<Player, GetPlayerDto> ConvertPlayerToDto = PlayerProjectionExpression.Compile();

	public async Task<GetPlayerDto> CreateNewPlayer(string userId, string name)
	{
		if (await randomizerContext.Players.AnyAsync(x => x.UserId == userId && x.PlayerName == name))
		{
			throw new PlayerNameAlreadyUsedException("Another player already exists with this same name");
		}

		var entity = randomizerContext.Players.Add(new()
		{
			PlayerName = name,
			UserId = userId
		});
		await randomizerContext.SaveChangesAsync();
		return ConvertPlayerToDto(entity.Entity);
	}

	public async Task DeletePlayer(string userId, Guid playerId)
	{
		await randomizerContext.Players.Where(x => x.UserId == userId && x.PlayerId == playerId).ExecuteDeleteAsync();
	}

	public async Task<List<GetPlayerDto>> GetUserPlayers(string userId)
	{
		return await randomizerContext.Players
			.Where(x => x.UserId == userId)
			.Select(PlayerProjectionExpression).ToListAsync();
	}
	public async Task<GetPlayerDto?> FindPlayer(string userId, Guid playerId)
	{
		return await randomizerContext.Players
			.Where(x => x.UserId == userId && x.PlayerId == playerId)
			.Select(PlayerProjectionExpression).SingleOrDefaultAsync();
	}
	public async Task<GetPlayerDto> GetPlayer(string userId, Guid playerId)
	{
		return await FindPlayer(userId, playerId) ?? throw new PlayerNotFoundException("Not player was found for this user/player id combination")
		{
			Data = { { "UserId", userId }, { "PlayerId", playerId } }
		};
	}

	public async Task<GetPlayerDto> UpsertPlayer(string userId, Guid playerId, string newName)
	{
		bool nameIsAlreadyUsed = await randomizerContext.Players.AnyAsync(x =>
					x.UserId == userId &&
					x.PlayerId != playerId &&
					x.PlayerName == newName
		);
		if (nameIsAlreadyUsed)
		{
			throw new PlayerNameAlreadyUsedException("This name is already used by another player for this user");
		}


		var player = await randomizerContext.Players
				.SingleOrDefaultAsync(x => x.UserId == userId && x.PlayerId == playerId);
		if (player == null)
		{
			player = randomizerContext.Players.Add(new()
			{
				PlayerId = playerId,
				PlayerName = newName,
				UserId = userId
			}).Entity;
		}
		else
		{
			player.PlayerName = newName;
		}

		await randomizerContext.SaveChangesAsync();

		return ConvertPlayerToDto(player);
	}
}