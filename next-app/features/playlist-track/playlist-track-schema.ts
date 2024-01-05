import { PlaylistTypesEnum } from "@/lib/playlist-type-enum";
import { z } from "zod";


export const PlaylistTrackSchema = z.object({
	remoteTrackId: z.string().min(1),
	trackName: z.string().min(1),
});
export interface PlaylistTrackModel extends z.infer<typeof PlaylistTrackSchema> { }

export const PlaylistTrackSchemaWithId = z.object({
	trackId: z.string().min(1),
}).merge(PlaylistTrackSchema);
export interface PlaylistTrackModelWithId extends z.infer<typeof PlaylistTrackSchemaWithId> { }

export const PlaylistTrackSchemaWithTrackType = z.object({
	trackType: PlaylistTypesEnum,
}).merge(PlaylistTrackSchemaWithId);
export interface PlaylistTrackModelWithTrackType extends z.infer<typeof PlaylistTrackSchemaWithTrackType> { }


export const PlaylistTrackSchemaForPatch = z.object({
	trackId: z.string().min(1),
	orderingKey: z.string()
})
export interface PlaylistTrackModelForPatch extends z.infer<typeof PlaylistTrackSchemaForPatch> { }
