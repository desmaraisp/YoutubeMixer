using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Randomizer.Dal.Migrations.Postgresql.Migrations;

/// <inheritdoc />
public partial class InitialCreate : Migration
{
	/// <inheritdoc />
	protected override void Up(MigrationBuilder migrationBuilder)
	{
		migrationBuilder.CreateTable(
			name: "Players",
			columns: table => new
			{
				PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
				Id = table.Column<int>(type: "integer", nullable: false)
					.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
				UserId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
				PlayerName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_Players", x => x.PlayerId);
			});

		migrationBuilder.CreateTable(
			name: "Playlists",
			columns: table => new
			{
				PlaylistId = table.Column<Guid>(type: "uuid", nullable: false),
				Id = table.Column<int>(type: "integer", nullable: false)
					.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
				RemotePlaylistId = table.Column<string>(type: "text", nullable: false),
				RemotePlaylistType = table.Column<int>(type: "integer", nullable: false),
				PlaylistName = table.Column<string>(type: "text", nullable: false),
				IsEnabled = table.Column<bool>(type: "boolean", nullable: false),
				PlayerId = table.Column<Guid>(type: "uuid", nullable: false)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_Playlists", x => x.PlaylistId);
				table.ForeignKey(
					name: "FK_Playlists_Players_PlayerId",
					column: x => x.PlayerId,
					principalTable: "Players",
					principalColumn: "PlayerId",
					onDelete: ReferentialAction.Cascade);
			});

		migrationBuilder.CreateTable(
			name: "PlaylistTracks",
			columns: table => new
			{
				TrackId = table.Column<Guid>(type: "uuid", nullable: false),
				Id = table.Column<int>(type: "integer", nullable: false)
					.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
				RemoteTrackId = table.Column<string>(type: "text", nullable: false),
				TrackName = table.Column<string>(type: "text", nullable: false),
				PlaylistId = table.Column<Guid>(type: "uuid", nullable: false)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_PlaylistTracks", x => x.TrackId);
				table.ForeignKey(
					name: "FK_PlaylistTracks_Playlists_PlaylistId",
					column: x => x.PlaylistId,
					principalTable: "Playlists",
					principalColumn: "PlaylistId",
					onDelete: ReferentialAction.Cascade);
			});

		migrationBuilder.CreateTable(
			name: "TrackWeights",
			columns: table => new
			{
				WeightId = table.Column<Guid>(type: "uuid", nullable: false),
				Id = table.Column<int>(type: "integer", nullable: false)
					.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
				WeightValue = table.Column<float>(type: "real", nullable: false),
				TrackId = table.Column<Guid>(type: "uuid", nullable: false)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_TrackWeights", x => x.WeightId);
				table.ForeignKey(
					name: "FK_TrackWeights_PlaylistTracks_TrackId",
					column: x => x.TrackId,
					principalTable: "PlaylistTracks",
					principalColumn: "TrackId",
					onDelete: ReferentialAction.Cascade);
			});

		migrationBuilder.CreateIndex(
			name: "IX_Players_Id",
			table: "Players",
			column: "Id");

		migrationBuilder.CreateIndex(
			name: "IX_Players_PlayerName_UserId",
			table: "Players",
			columns: new[] { "PlayerName", "UserId" },
			unique: true);

		migrationBuilder.CreateIndex(
			name: "IX_PlaylistTracks_Id",
			table: "PlaylistTracks",
			column: "Id");

		migrationBuilder.CreateIndex(
			name: "IX_PlaylistTracks_PlaylistId",
			table: "PlaylistTracks",
			column: "PlaylistId");

		migrationBuilder.CreateIndex(
			name: "IX_Playlists_Id",
			table: "Playlists",
			column: "Id");

		migrationBuilder.CreateIndex(
			name: "IX_Playlists_PlayerId",
			table: "Playlists",
			column: "PlayerId");

		migrationBuilder.CreateIndex(
			name: "IX_TrackWeights_Id",
			table: "TrackWeights",
			column: "Id");

		migrationBuilder.CreateIndex(
			name: "IX_TrackWeights_TrackId",
			table: "TrackWeights",
			column: "TrackId",
			unique: true);
	}

	/// <inheritdoc />
	protected override void Down(MigrationBuilder migrationBuilder)
	{
		migrationBuilder.DropTable(
			name: "TrackWeights");

		migrationBuilder.DropTable(
			name: "PlaylistTracks");

		migrationBuilder.DropTable(
			name: "Playlists");

		migrationBuilder.DropTable(
			name: "Players");
	}
}