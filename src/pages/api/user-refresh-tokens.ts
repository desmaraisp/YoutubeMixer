import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/auth-middleware";
import { getRefreshTokensFromDB } from "@/lib/firestore/get-set-db-refresh-token";
import { onApiError } from '@/lib/middleware/on-api-error';
import { TokensApiResponseModel } from '../../models/api-models/user-refresh-tokens';

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(RequiredAuthorization())
	.get(
		async (req, res, _next) => {
			const refreshToken = await getRefreshTokensFromDB(req.uid)

			res.status(200).json({isSpotifyLoggedIn: !!refreshToken.spotifyRefreshToken, isGoogleLoggedIn: !!refreshToken.googleRefreshToken } as TokensApiResponseModel)
		},
	);

export default router.handler({
	onError: onApiError,
})