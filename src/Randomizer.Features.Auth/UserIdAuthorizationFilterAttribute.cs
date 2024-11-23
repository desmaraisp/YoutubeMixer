using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Randomizer.Features.Auth;

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

public class RouteUserIdAuthorizationRequirement : IAuthorizationRequirement
{
}

public class RouteUserIdAuthorizationHandler : AuthorizationHandler<RouteUserIdAuthorizationRequirement>
{
	public const string RouteUserIdPolicyName = "RouteUserId";
	protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RouteUserIdAuthorizationRequirement requirement)
	{
		if (context.Resource is HttpContext httpContext)
		{
			var userIdInUrl = httpContext.Request.RouteValues["userId"]?.ToString();

			if (string.IsNullOrWhiteSpace(userIdInUrl))
			{
				context.Fail();
				return Task.CompletedTask;
			}

			var userId = context.User.GetUserId();
			if (userIdInUrl != userId)
			{
				context.Fail();
				return Task.CompletedTask;
			}

			context.Succeed(requirement);
		}
		return Task.CompletedTask;
	}
}