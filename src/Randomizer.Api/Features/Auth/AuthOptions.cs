using System.ComponentModel.DataAnnotations;

namespace Randomizer.Api.Features.Auth;

public record class AuthOptions {
	[Required, Url]
	public required string MetadataAddress { get; init; }
}