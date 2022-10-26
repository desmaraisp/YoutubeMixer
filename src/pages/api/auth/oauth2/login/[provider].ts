import googlePassport from "@/lib/auth-services/passport-google-auth";
import spotifyPassport from "@/lib/auth-services/passport-spotify-auth";
import { RequiredAuthorization } from "@/lib/middleware/firebase-auth-middleware";
import { BadRequestException } from "@/models/exceptions/custom-exceptions";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { onApiError } from "../../../../../lib/middleware/on-api-error";

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(async (req, res, next) => {
		const { tokenID } = req.query
		req.headers.authorization = tokenID as string
		return await next();
	})
	.use(RequiredAuthorization())
	.get(async (req, res, next) => {
		const { provider } = req.query

		if (provider === 'google') {
			const authenticator = googlePassport.authenticate("google", {
				scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.readonly"],
				accessType: 'offline',
				state: req.uid,
				passReqToCallback: true
			})
			authenticator(req, res, next)
			return
		}

		if (provider === 'spotify') {
			const authenticator = spotifyPassport.authenticate("spotify", {
				scope: ['user-read-email', 'user-read-private'],
				passReqToCallback: true,
				state: req.uid
			})
			authenticator(req, res, next)
			return
		}

		throw new BadRequestException("Provider not recognized")
	}
	);
export default router.handler({
	onError: onApiError,
})
