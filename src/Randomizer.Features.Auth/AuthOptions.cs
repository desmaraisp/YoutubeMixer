using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Options;

namespace Randomizer.Features.Auth;

public record class AuthOptions
{
	[Required, Url]
	public required string MetadataAddress { get; init; }
}

[OptionsValidator]
public partial class ValidateAuthOptions : IValidateOptions<AuthOptions>
{
}