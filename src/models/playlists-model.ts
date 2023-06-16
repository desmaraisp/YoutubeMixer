import { z } from "zod";
import { PlaylistModelValidator } from "./playlist-model";

export const PlaylistsModelValidator = z.object({
	playlists: z.array(PlaylistModelValidator),
})
export interface PlaylistsModel extends z.infer<typeof PlaylistsModelValidator>{}
