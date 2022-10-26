import { PlaylistTypesEnum } from "./playlist-types";
import { z } from 'zod'

export const PlaylistItemValidator = z.object({
	itemName: z.string(),
	itemID: z.string(),
	itemImageURL: z.string(),
	uuid: z.string(),
	type: PlaylistTypesEnum
})

export interface PlaylistItem extends z.infer<typeof PlaylistItemValidator>{}
