-- CreateEnum
CREATE TYPE "PlaylistType" AS ENUM ('Youtube', 'Spotify');

-- CreateTable
CREATE TABLE "PlayerTrack" (
    "playerTrackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistTrackId" TEXT NOT NULL,

    CONSTRAINT "PlayerTrack_pkey" PRIMARY KEY ("playerTrackId")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlistId" TEXT NOT NULL,
    "remotePlaylistId" TEXT NOT NULL,
    "playlistName" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "playlistType" "PlaylistType" NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "PlaylistTrack" (
    "playlistTrackId" TEXT NOT NULL,
    "remoteTrackId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "isPlaying" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("playlistTrackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTrack_playlistTrackId_key" ON "PlayerTrack"("playlistTrackId");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistTrack_isPlaying_key" ON "PlaylistTrack"("isPlaying");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistTrack_orderId_key" ON "PlaylistTrack"("orderId");

-- AddForeignKey
ALTER TABLE "PlayerTrack" ADD CONSTRAINT "PlayerTrack_playlistTrackId_fkey" FOREIGN KEY ("playlistTrackId") REFERENCES "PlaylistTrack"("playlistTrackId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("playlistId") ON DELETE RESTRICT ON UPDATE CASCADE;
