import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/firebase-auth-middleware";
import { getRefreshTokensFromDB } from "@/lib/firestore/get-set-db-refresh-token";
import { GetLoggedInCustomProvidersSuccessResponse } from '../../../models/api-models/get-logged-in-custom-providers-model';
import { onApiError } from '@/lib/middleware/on-api-error';

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(RequiredAuthorization())
	.get(
		async (req, res, _next) => {
			const refreshToken = await getRefreshTokensFromDB(req.uid)

			res.json({isSpotifyLoggedIn: !!refreshToken.spotifyRefreshToken, isGoogleLoggedIn: !!refreshToken.googleRefreshToken } as GetLoggedInCustomProvidersSuccessResponse)
		},
	);

export default router.handler({
	onError: onApiError,
})