using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Randomizer.Features.Auth;
using Randomizer.Features.Players.Api.PlayersService;

namespace Randomizer.Features.Players.Api;

[JsonSerializable(typeof(PostOrPutPlayerApiModel))]
[JsonSerializable(typeof(GetPlayerApiModel))]
[JsonSerializable(typeof(List<GetPlayerApiModel>))]
internal partial class PlayersSerializerContext : JsonSerializerContext
{

}


public static class WebApplicationBuilderExtensions
{
	public static IHostApplicationBuilder RegisterPlayersApiFeature(this IHostApplicationBuilder builder)
	{
		builder.Services.AddScoped<IPlayersService, PlayersService.PlayersService>();
		builder.Services.ConfigureHttpJsonOptions(options =>
		{
			options.SerializerOptions.TypeInfoResolverChain.Add(PlayersSerializerContext.Default);
		});
		return builder;
	}

	public static RouteGroupBuilder RegisterPlayersEndpoints(this RouteGroupBuilder rootRootVersionedGroupBuilder)
	{
		var playersGroup = rootRootVersionedGroupBuilder.MapGroup("users/{userId:string}/players")
													.RequireAuthorization(RouteUserIdAuthorizationHandler.RouteUserIdPolicyName);

		playersGroup.MapGet("{playerId:guid}", [UserIdAuthorizationFilter] async static (
			[FromServices] IPlayersService service,
			string userId,
			Guid playerId,
			ClaimsPrincipal user
		) =>
		{
			var result = await service.GetPlayer(userId, playerId);
			return GetPlayerApiModel.FromDto(result);
		}).WithDisplayName("GetPlayer");

		playersGroup.MapGet("", async static (
			[FromServices] IPlayersService service,
			string userId,
			ClaimsPrincipal user
		) =>
		{
			var res = await service.GetUserPlayers(userId);
			return res.ConvertAll(GetPlayerApiModel.FromDto);
		}).WithDisplayName("GetPlayers");

		playersGroup.MapPost("", async static (
			[FromServices] IPlayersService service,
			string userId,
			PostOrPutPlayerApiModel payload,
			ClaimsPrincipal user
		) =>
		{
			var res = await service.CreateNewPlayer(userId, payload.PlayerName);
			return GetPlayerApiModel.FromDto(res);
		}).WithDisplayName("PostPlayer");


		playersGroup.MapPut("{playerId:guid}", async static (
			[FromServices] IPlayersService service,
			string userId,
			Guid playerId,
			PostOrPutPlayerApiModel payload,
			ClaimsPrincipal user
		) =>
		{
			var res = await service.UpsertPlayer(userId, playerId, payload.PlayerName);
			return GetPlayerApiModel.FromDto(res);
		}).WithDisplayName("PutPlayer");


		playersGroup.MapDelete("{playerId:guid}", async static (
			[FromServices] IPlayersService service,
			string userId,
			Guid playerId,
			ClaimsPrincipal user
		) =>
		{
			await service.DeletePlayer(userId, playerId);
			return Results.NoContent();
		}).WithDisplayName("DeletePlayer");

		return rootRootVersionedGroupBuilder;
	}
}