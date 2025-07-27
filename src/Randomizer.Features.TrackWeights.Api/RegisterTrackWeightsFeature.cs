using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Randomizer.Features.TrackWeights.Api.TrackWeightsService;

namespace Randomizer.Features.TrackWeights.Api;

[JsonSerializable(typeof(List<PutTrackWeightsApiModel>))]
internal sealed partial class TracksWeightsSerializerContext : JsonSerializerContext
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

		trackWeightsGroup.MapPut("players/{playerId:guid}/track-weights", async (
			[FromServices] ITrackWeightsService service,
			Guid playerId,
			[FromBody] List<PutTrackWeightsApiModel> payload,
			ClaimsPrincipal user
		) =>
		{
			await service.UpdatePlayerWeightsCollection(
				user.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value,
				playerId,
				payload.ConvertAll(x => x.ToDto())
			);
			return Results.NoContent();
		});
		return rootRootVersionedGroupBuilder;
	}
}