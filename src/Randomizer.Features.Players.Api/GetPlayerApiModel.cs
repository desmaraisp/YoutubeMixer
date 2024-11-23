using Randomizer.Features.Players.Api.PlayersService;

namespace Randomizer.Features.Players.Api;

public class GetPlayerApiModel
{
	public required Guid PlayerId { get; init; }
	public required string PlayerName { get; init; }
	public required int TracksCount { get; init; }
	public required int PlaylistsCount { get; init; }

	public static GetPlayerApiModel FromDto(GetPlayerDto getPlayerDto) => new()
	{
		PlayerId = getPlayerDto.PlayerId,
		PlayerName = getPlayerDto.PlayerName,
		PlaylistsCount = getPlayerDto.PlaylistsCount,
		TracksCount = getPlayerDto.TracksCount,
	};
}