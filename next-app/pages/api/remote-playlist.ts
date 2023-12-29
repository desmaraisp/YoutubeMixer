import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { GetPlaylistData } from "@/features/remote-playlist/lib/get-playlist-data";
import { RemotePlaylistModelWithDetails, RemotePlaylistSchema, RemotePlaylistSchemaWithDetails } from "@/features/remote-playlist/remote-playlist-schema";

const router = createRouter<NextApiRequest, NextApiResponse>();
export const playlistsRouteConfig: RouteConfig = {
	method: 'get',
	path: '/api/remote-playlist',
	request: {
		params: RemotePlaylistSchema,
	},
	responses: {
		200: {
			description: 'Success.',
			content: {
				'application/json': {
					schema: RemotePlaylistSchemaWithDetails
				}
			}
		}
	},
}

router
	.get(
		async (req, res, _next) => {
			const payload = RemotePlaylistSchema.parse({
				remotePlaylistId: req.query["remote-playlist-id"],
				playlistType: req.query["playlist-type"]
			})

			const playlistData = await GetPlaylistData(payload.remotePlaylistId, payload.playlistType)
			const response: RemotePlaylistModelWithDetails = {
				playlistType: payload.playlistType,
				playlistName: playlistData.playlistName,
				remotePlaylistId: payload.remotePlaylistId,
				playlistItems: playlistData.playlistTracks
			};
			res.status(200).json(response)
		},
	)

export default router.handler({
	onError: onApiError,
})