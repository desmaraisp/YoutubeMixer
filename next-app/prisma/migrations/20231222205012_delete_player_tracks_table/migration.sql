/*
  Warnings:

  - You are about to drop the `PlayerTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerTrack" DROP CONSTRAINT "PlayerTrack_playlistTrackId_fkey";

-- DropTable
DROP TABLE "PlayerTrack";
