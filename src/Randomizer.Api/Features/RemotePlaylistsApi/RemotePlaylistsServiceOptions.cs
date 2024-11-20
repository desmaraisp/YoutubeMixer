using System.ComponentModel.DataAnnotations;

namespace Randomizer.Api.Features.RemotePlaylistsApi;

public class RemotePlaylistsServiceOptions
{
	[Required]
	public required string ClientId { get; init; }

	[Required]
	public required string ClientSecret { get; init; }
}