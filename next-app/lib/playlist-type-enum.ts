import {z} from 'zod'

export const PlaylistTypesEnum = z.enum(['Spotify', 'Youtube'])

export const AllowedPlaylistTypes = Object.keys(PlaylistTypesEnum.Values)
