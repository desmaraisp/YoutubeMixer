using Randomizer.Api.Features.PlayerProgressApi;
using Randomizer.Api.Features.PlayersApi;
using Randomizer.Api.Features.PlayerTracksApi;
using Randomizer.Api.Features.RemotePlaylistsApi;
using Serilog;
using Randomizer.Features.Database;
using Randomizer.Features.Auth;

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


		builder.RegisterPlayersApiFeature()
				.RegisterPlayerProgressFeature()
				.RegisterPlayerTracksApiFeature()
				.RegisterRemotePlaylistsApiFeature()
				.RegisterAuthenticationFeature()
				.RegisterDatabase();

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		var app = builder.Build();

		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}

		app.UseAuthorization();

		app.MapControllers();

		app.Run();
	}
}