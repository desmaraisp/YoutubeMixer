namespace Randomizer.Features.Players.Api.PlayersService;

public interface IPlayersService
{
	public Task<List<GetPlayerDto>> GetUserPlayers(string userId);
	public Task<GetPlayerDto> CreateNewPlayer(string userId, string name);
	public Task<GetPlayerDto> UpsertPlayer(string userId, Guid playerId, string newName);
	public Task<GetPlayerDto?> FindPlayer(string userId, Guid playerId);
	public Task<GetPlayerDto> GetPlayer(string userId, Guid playerId);
	public Task DeletePlayer(string userId, Guid playerId);
}

public record class GetPlayerDto
{
	public Guid PlayerId { get; init; }
	public required string PlayerName { get; init; }
	public required int TracksCount { get; init; }
	public required int PlaylistsCount { get; init; }
	public required string UserId { get; init; }
}