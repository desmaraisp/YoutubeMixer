import { PlaylistTypesEnum } from "./playlist-types";
import { z } from 'zod'

export const trackSchema = z.object({
	itemName: z.string(),
	itemID: z.string(),
	itemImageURL: z.string(),
	uuid: z.string(),
	type: PlaylistTypesEnum
})

export interface TrackModel extends z.infer<typeof trackSchema>{}
