import { z } from "zod";
import { playlistSchema } from "./playlist-model";

export const playlistsSchema = z.object({
	playlists: z.array(playlistSchema),
})
export interface PlaylistsModel extends z.infer<typeof playlistsSchema>{}
