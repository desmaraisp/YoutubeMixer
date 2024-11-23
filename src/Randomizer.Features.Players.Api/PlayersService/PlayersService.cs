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

	public async Task<GetPlayerDto> CreateNewPlayer(string UserId, string Name)
	{
		if (await randomizerContext.Players.AnyAsync(x => x.UserId == UserId && x.PlayerName == Name))
		{
			throw new PlayerNameAlreadyUsedException("Another player already exists with this same name");
		}

		var entity = randomizerContext.Players.Add(new()
		{
			PlayerName = Name,
			UserId = UserId
		});
		await randomizerContext.SaveChangesAsync();
		return ConvertPlayerToDto(entity.Entity);
	}

	public async Task DeletePlayer(string UserId, Guid PlayerId)
	{
		await randomizerContext.Players.Where(x => x.UserId == UserId && x.PlayerId == PlayerId).ExecuteDeleteAsync();
	}

	public async Task<List<GetPlayerDto>> GetUserPlayers(string UserId)
	{
		return await randomizerContext.Players
			.Where(x => x.UserId == UserId)
			.Select(PlayerProjectionExpression).ToListAsync();
	}
	public async Task<GetPlayerDto?> FindPlayer(string UserId, Guid PlayerId)
	{
		return await randomizerContext.Players
			.Where(x => x.UserId == UserId && x.PlayerId == PlayerId)
			.Select(PlayerProjectionExpression).SingleOrDefaultAsync();
	}
	public async Task<GetPlayerDto> GetPlayer(string UserId, Guid PlayerId)
	{
		return await FindPlayer(UserId, PlayerId) ?? throw new PlayerNotFoundException("Not player was found for this user/player id combination")
		{
			Data = { { "UserId", UserId }, { "PlayerId", PlayerId } }
		};
	}

	public async Task<GetPlayerDto> UpsertPlayer(string UserId, Guid PlayerId, string NewName)
	{
		bool nameIsAlreadyUsed = await randomizerContext.Players.AnyAsync(x =>
					x.UserId == UserId &&
					x.PlayerId != PlayerId &&
					x.PlayerName == NewName
		);
		if (nameIsAlreadyUsed)
		{
			throw new PlayerNameAlreadyUsedException("This name is already used by another player for this user");
		}


		var player = await randomizerContext.Players
				.SingleOrDefaultAsync(x => x.UserId == UserId && x.PlayerId == PlayerId);
		if (player == null)
		{
			player = randomizerContext.Players.Add(new()
			{
				PlayerId = PlayerId,
				PlayerName = NewName,
				UserId = UserId
			}).Entity;
		}
		else
		{
			player.PlayerName = NewName;
		}

		await randomizerContext.SaveChangesAsync();

		return ConvertPlayerToDto(player);
	}
}