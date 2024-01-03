-- DropIndex
DROP INDEX "PlaylistTrack_isPlaying_key";

-- DropIndex
DROP INDEX "PlaylistTrack_orderId_key";

-- AlterTable
ALTER TABLE "PlaylistTrack" DROP COLUMN "isPlaying",
DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "Player" (
    "playerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentTrackId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_currentTrackId_key" ON "Player"("currentTrackId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_currentTrackId_fkey" FOREIGN KEY ("currentTrackId") REFERENCES "PlaylistTrack"("playlistTrackId") ON DELETE RESTRICT ON UPDATE CASCADE;
