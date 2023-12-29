import { PlaylistTypesEnum } from "@/lib/playlist-type-enum";
import { z } from "zod";
import { PlaylistTrackSchema } from "../playlist-track/playlist-track-schema";

export const RemotePlaylistSchema = z.object({
	remotePlaylistId: z.string().min(1),
	playlistType: PlaylistTypesEnum
})
export interface RemotePlaylistModel extends z.infer<typeof RemotePlaylistSchema> { }


export const RemotePlaylistSchemaWithDetails = z.object({
	playlistName: z.string().min(1),
	playlistItems: z.array(PlaylistTrackSchema)
}).merge(RemotePlaylistSchema)
export interface RemotePlaylistModelWithDetails extends z.infer<typeof RemotePlaylistSchemaWithDetails> { }
