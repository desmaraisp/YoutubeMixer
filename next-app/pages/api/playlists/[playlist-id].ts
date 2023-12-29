import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { z } from "zod";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { PlaylistModelWithId, PlaylistSchema, PlaylistSchemaWithId } from "@/features/playlist/playlist-schema";
import { PlaylistTrackModelWithId } from "@/features/playlist-track/playlist-track-schema";

const router = createRouter<NextApiRequest, NextApiResponse>();
export const playlistDeleteRouteConfig: RouteConfig = {
	method: 'delete',
	path: '/api/playlist/{playlist-id}',
	request: {
		params: z.object({
			"playlist-id": z.string().min(1),
		})
	},
	responses: {
		200: {
			description: 'Success.'
		}
	},
}
export const playlistPutRouteConfig: RouteConfig = {
	method: 'put',
	path: '/api/playlist/{playlist-id}',
	request: {
		params: z.object({
			"playlist-id": z.string().min(1),
		}),
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
	.delete(
		async (req, res, _next) => {
			const playlistId = req.query["playlist-id"]
			const singlePlaylistId = Array.isArray(playlistId) ? playlistId[0] : playlistId;

			await prismaClient.$transaction(async (tr) => {
				await tr.player.delete({ where: { userId: 'null' } })
				await tr.playlistTrack.deleteMany({
					where: {
						playlistId: singlePlaylistId
					}
				})

				await tr.playlist.delete({
					where: {
						playlistId: singlePlaylistId
					}
				})
			})
			res.status(200).json(null)
		},
	)
	.put(
		async (req, res, _next) => {
			const playlistId = req.query["playlist-id"]
			const payload = await PlaylistSchema.parseAsync(req.body)

			const singlePlaylistId = Array.isArray(playlistId) ? playlistId[0] : playlistId;
			
			await prismaClient.player.delete({ where: { userId: 'null' } })
			const updatedPlaylist = await prismaClient.playlist.update({
				where: {
					playlistId: singlePlaylistId
				},
				data: {
					playlistName: payload.playlistName,
					playlistType: payload.playlistType,
					enabled: payload.enabled,
					remotePlaylistId: payload.remotePlaylistId,
					playlistItems: {
						deleteMany: {
							playlistId: { equals: singlePlaylistId }
						},
						createMany: {
							data: payload.playlistItems.map(x => ({
								itemName: x.trackName,
								remoteTrackId: x.remoteTrackId
							}))
						}
					}
				},
				include: {
					playlistItems: true
				}
			})

			const response: PlaylistModelWithId = {
				playlistId: updatedPlaylist.playlistId,
				playlistName: updatedPlaylist.playlistName,
				playlistType: updatedPlaylist.playlistType,
				remotePlaylistId: updatedPlaylist.remotePlaylistId,
				enabled: updatedPlaylist.enabled,
				playlistItems: updatedPlaylist.playlistItems.map<PlaylistTrackModelWithId>(x => ({
					remoteTrackId: x.remoteTrackId,
					trackId: x.playlistTrackId,
					trackName: x.itemName,
					trackType: updatedPlaylist.playlistType
				}))
			};
			res.status(200).json(response)
		},
	)

export default router.handler({
	onError: onApiError,
})