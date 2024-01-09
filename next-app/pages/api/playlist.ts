import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { contentTypeFilterMiddleware } from "@/middleware/content-type-filter";
import { PlaylistModelWithId, PlaylistSchema, PlaylistSchemaWithId } from "@/features/playlist/playlist-schema";
import { PlaylistTrackModelWithId } from "@/features/playlist-track/playlist-track-schema";
import { RequiredAuthorization } from "@/middleware/api-auth-middleware";
import { User } from "@supabase/supabase-js";

const router = createRouter<NextApiRequest & {user: User}, NextApiResponse>();
export const playlistsRouteConfig: RouteConfig = {
	method: 'post',
	path: '/api/playlist',
	request: {
		body: {
			content: {
				'application/json': {
					schema: PlaylistSchema
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Success.',
			content: {
				'application/json': {
					schema: PlaylistSchemaWithId
				}
			}
		}
	},
}

router
	.post(
		contentTypeFilterMiddleware('application/json'),
		RequiredAuthorization(),
		async (req, res, _next) => {
			const payload = await PlaylistSchema.parseAsync(req.body)

			const createdPlaylist = await prismaClient.playlist.create({
				data: {
					userId: req.user.id,
					playlistName: payload.playlistName,
					playlistType: payload.playlistType,
					enabled: payload.enabled,
					remotePlaylistId: payload.remotePlaylistId,
					playlistItems: {
						createMany: {
							data: payload.playlistItems.map(x => ({
								itemName: x.trackName,
								orderingKey: Math.random().toString(36).substring(3,9),
								remoteTrackId: x.remoteTrackId
							}))
						}
					}
				},
				include: {
					playlistItems: true
				},
			})

			const response: PlaylistModelWithId = {
				playlistId: createdPlaylist.playlistId,
				enabled: createdPlaylist.enabled,
				playlistName: createdPlaylist.playlistName,
				playlistType: createdPlaylist.playlistType,
				remotePlaylistId: createdPlaylist.remotePlaylistId,
				playlistItems: createdPlaylist.playlistItems.map<PlaylistTrackModelWithId>(x => ({
					remoteTrackId: x.remoteTrackId,
					trackName: x.itemName,
					trackId: x.playlistTrackId,
				}))
			};
			res.status(200).json(response)
		},
	)

export default router.handler({
	onError: onApiError,
})