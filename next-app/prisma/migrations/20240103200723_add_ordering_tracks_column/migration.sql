-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_currentTrackId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistTrack" DROP CONSTRAINT "PlaylistTrack_playlistId_fkey";

-- AlterTable
ALTER TABLE "PlaylistTrack" ADD COLUMN     "orderingKey" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_currentTrackId_fkey" FOREIGN KEY ("currentTrackId") REFERENCES "PlaylistTrack"("playlistTrackId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("playlistId") ON DELETE CASCADE ON UPDATE CASCADE;
