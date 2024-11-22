using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Randomizer.Features.TrackWeights.Api.TrackWeightsService;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace Randomizer.Features.TrackWeights.Api;

[JsonSerializable(typeof(List<PutTrackWeightsApiModel>))]
internal partial class TracksWeightsSerializerContext : JsonSerializerContext
{

}

public static class WebApplicationBuilderExtensions
{
	public static IHostApplicationBuilder RegisterTrackWeightsFeature(this IHostApplicationBuilder builder)
	{
		builder.Services.AddScoped<ITrackWeightsService, TrackWeightsService.TrackWeightsService>();
		builder.Services.ConfigureHttpJsonOptions(options =>
		{
			options.SerializerOptions.TypeInfoResolverChain.Add(TracksWeightsSerializerContext.Default);
		});
		return builder;
	}

	public static RouteGroupBuilder RegisterTrackWeightsEndpoints(this RouteGroupBuilder rootRootVersionedGroupBuilder)
	{
		var trackWeightsGroup = rootRootVersionedGroupBuilder.MapGroup("track-weights").RequireAuthorization();

		rootRootVersionedGroupBuilder.MapPut("players/{playerId:guid}/track-weights", async (
			[FromServices] ITrackWeightsService service,
			Guid playerId,
			[FromBody] List<PutTrackWeightsApiModel> payload,
			ClaimsPrincipal user
		) =>
		{
			await service.UpdatePlayerWeightsCollection(
				user.Claims.First(x=> x.Type == ClaimTypes.NameIdentifier).Value,
				playerId,
				payload.ConvertAll(x => x.ToDto())
			);
			return Results.NoContent();
		});
		return rootRootVersionedGroupBuilder;
	}
}