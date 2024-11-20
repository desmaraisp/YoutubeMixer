using Randomizer.Api.Features.Auth;
using Randomizer.Api.Features.DatabaseRegistration;
using Randomizer.Api.Features.PlayerProgressApi;
using Randomizer.Api.Features.PlayersApi;
using Randomizer.Api.Features.PlayerTracksApi;
using Randomizer.Api.Features.RemotePlaylistsApi;
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


		builder.RegisterAuthenticationFeature()
				.RegisterPlayersApiFeature()
				.RegisterPlayerProgressFeature()
				.RegisterPlayerTracksApiFeature()
				.RegisterRemotePlaylistsApiFeature()
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