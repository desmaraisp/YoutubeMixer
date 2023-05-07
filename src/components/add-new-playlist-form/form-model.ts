import { PlaylistTypesEnum } from "@/models/playlist-types";
import { z } from "zod";

export const formSchema = z.object({
	playlistID: z
		.string()
		.min(1, { message: "PlaylistID is required" }),
	playlistType: PlaylistTypesEnum
})
export interface FormSchema extends z.infer<typeof formSchema> {}
