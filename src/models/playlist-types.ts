import { z } from 'zod'

export const PlaylistTypesEnum = z.enum(["Youtube", "Spotify"])
export type PlaylistTypes = z.infer<typeof PlaylistTypesEnum>;
