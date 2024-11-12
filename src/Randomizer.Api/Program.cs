using Microsoft.EntityFrameworkCore;
using Randomizer.Api.Features.Auth;
using Randomizer.Api.Features.DatabaseRegistration;
using Randomizer.Api.Features.PlayersApi;
using Randomizer.Api.Features.PlayerTracksApi;
using Serilog;

internal class Program
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
				.RegisterPlayerTracksApiFeature()
				.RegisterDatabase();

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		var app = builder.Build();

		// Configure the HTTP request pipeline.
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