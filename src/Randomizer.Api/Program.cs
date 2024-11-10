using Microsoft.EntityFrameworkCore;
using Randomizer.Api.Features.Auth;
using Randomizer.Api.Features.DatabaseRegistration;
using Randomizer.Api.Features.PlayersApi;

internal class Program
{
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.RegisterAuthenticationFeature()
				.RegisterPlayersApiFeature()
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