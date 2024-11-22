using System.Security.Claims;

namespace Randomizer.Features.Auth;

public static class ClaimsPrincipalExtensions
{
	public static string GetUserId(this ClaimsPrincipal user)
	{
		return user.Identities.First().Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
	}

}