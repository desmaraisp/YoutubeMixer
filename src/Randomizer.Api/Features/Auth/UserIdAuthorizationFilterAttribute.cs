using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Randomizer.Api.Features.Auth;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class UserIdAuthorizationFilterAttribute : Attribute, IAsyncAuthorizationFilter
{
	public Task OnAuthorizationAsync(AuthorizationFilterContext context)
	{
		var userIdInUrl = context.RouteData.Values["userId"]?.ToString();

		if (string.IsNullOrWhiteSpace(userIdInUrl))
		{
			context.Result = new UnauthorizedObjectResult("No userId found in uri");
			return Task.CompletedTask;
		}

		var userId = context.HttpContext.User.GetUserId();
		if (userIdInUrl != userId)
		{
			context.Result = new UnauthorizedObjectResult("UserId in uri does not match userId in claims");
			return Task.CompletedTask;
		}

		return Task.CompletedTask;
	}
}