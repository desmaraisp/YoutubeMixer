namespace Randomizer.Api.Features.PlayersApi.PlayersService;

public interface IPlayersService
{
	public Task<List<GetPlayerDto>> GetUserPlayers(string UserId);
	public Task<GetPlayerDto> CreateNewPlayer(string UserId, string Name);
	public Task<GetPlayerDto> UpsertPlayer(string UserId, Guid PlayerId, string NewName);
	public Task<GetPlayerDto?> FindPlayer(string UserId, Guid PlayerId);
	public Task<GetPlayerDto> GetPlayer(string UserId, Guid PlayerId);
	public Task DeletePlayer(string UserId, Guid PlayerId);
}

public record class GetPlayerDto
{
	public Guid PlayerId { get; init; }
	public required string PlayerName { get; init; }
	public required int TracksCount { get; init; }
	public required int PlaylistsCount { get; init; }
	public required string UserId { get; init; }
}