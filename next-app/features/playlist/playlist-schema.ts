import { z } from "zod";
import { PlaylistTrackSchemaWithId } from "../playlist-track/playlist-track-schema";
import { RemotePlaylistSchemaWithDetails } from "../remote-playlist/remote-playlist-schema";


export const PlaylistSchema = z.object({
	enabled: z.boolean(),
}).merge(RemotePlaylistSchemaWithDetails);
export interface PlaylistModel extends z.infer<typeof PlaylistSchema> { }

export const PlaylistSchemaWithId = z.object({
	playlistItems: z.array(PlaylistTrackSchemaWithId),
	playlistId: z.string(),
}).merge(PlaylistSchema)
export interface PlaylistModelWithId extends z.infer<typeof PlaylistSchemaWithId> { }

