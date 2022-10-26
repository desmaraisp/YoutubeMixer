import { PlaylistRequestModelValidator } from "@/models/api-models/playlist-api-models"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getYoutubePlaylistData } from '@/lib/playlist-api-services/get-youtube-playlist-data'
import { GaxiosError } from 'googleapis-common'
import { createRouter } from "next-connect";
import { OptionalAuthorization } from "@/lib/middleware/firebase-auth-middleware";
import { getRefreshTokensFromDB } from "@/lib/firestore/get-set-db-refresh-token";
import { getSpotifyPlaylistData } from "@/lib/playlist-api-services/get-spotify-playlist-data";
import { onApiError } from "@/lib/middleware/on-api-error";
import { BadRequestException, ErrorWithHTTPCode } from "@/models/exceptions/custom-exceptions";

const router = createRouter<NextApiRequest & { uid?: string }, NextApiResponse>();

router
	.use(OptionalAuthorization())
	.post(
		async (req, res, _next) => {
			const refreshToken = req.uid ? await getRefreshTokensFromDB(req.uid) : null
			const requestPayload = PlaylistRequestModelValidator.parse(JSON.parse(req.body))

			if (requestPayload.playlistType === 'Youtube') {
				try {
					const response = await getYoutubePlaylistData(requestPayload.playlistID, refreshToken?.googleRefreshToken ?? null)
					res.status(200).json(response)
					return
				}
				catch (e) {
					console.log(e)
					if (e instanceof GaxiosError) {
						throw new ErrorWithHTTPCode(e.message, e.response?.status ?? 500)
					}
					throw e
				}
			}

			else if (requestPayload.playlistType === 'Spotify') {
				try {
					const response = await getSpotifyPlaylistData(requestPayload.playlistID, refreshToken?.spotifyRefreshToken ?? null)
					res.status(200).json(response)
					return
				}
				catch (e) {
					console.log(e)
					throw e
				}
			}

			throw new BadRequestException("This playlist type isn't valid")
		},
	);

export default router.handler({
	onError: onApiError,
})