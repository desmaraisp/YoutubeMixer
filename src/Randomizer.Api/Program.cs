using Asp.Versioning;
using Randomizer.Api.Features.PlayerProgressApi;
using Randomizer.Api.Features.PlayersApi;
using Randomizer.Api.Features.PlayerTracksApi;
using Randomizer.Api.Features.RemotePlaylistsApi;
using Randomizer.Features.Auth;
using Randomizer.Features.Database;
using Randomizer.Features.TrackWeights.Api;
using Serilog;

internal sealed class Program
{
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);
		builder.Host.UseSerilog((context, config) =>
		{
			Environment.SetEnvironmentVariable("BASEDIR", AppDomain.CurrentDomain.BaseDirectory);
			config.ReadFrom.Configuration(context.Configuration);
		});

		builder.Services.AddApiVersioning(c =>
		{
			c.AssumeDefaultVersionWhenUnspecified = true;
			c.ApiVersionReader = new UrlSegmentApiVersionReader();
		}).AddApiExplorer(c =>
		{
			c.GroupNameFormat = "v'V'";
		});

		builder.RegisterPlayersApiFeature()
				.RegisterPlayerProgressFeature()
				.RegisterPlayerTracksApiFeature()
				.RegisterRemotePlaylistsApiFeature()
				.RegisterAuthenticationFeature()
				.RegisterTrackWeightsFeature()
				.RegisterDatabase();

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddOpenApi();

		var app = builder.Build();

		app.MapOpenApi();
		app.UseSwaggerUI();
		app.UseAuthorization();

		var rootApiVersionSet = app.NewApiVersionSet()
			.HasApiVersion(new(1.0))
			.Build();
		app.MapGroup("api/v{version:apiVersion}")
			.WithApiVersionSet(rootApiVersionSet)
			.RegisterTrackWeightsEndpoints();
		app.MapControllers();

		app.Run();
	}
}