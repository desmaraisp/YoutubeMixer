import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { createGooglePassport } from "@/lib/auth-services/passport-google-auth";
import { createSpotifyPassport } from "@/lib/auth-services/passport-spotify-auth";
import { onApiError } from "@/lib/middleware/on-api-error";
import { BadRequestException } from "@/models/exceptions/custom-exceptions";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res, next) => {
	const { provider } = req.query

	if (provider === 'google') {
		const authenticator = createGooglePassport().authenticate("google", { session: false })
		authenticator(req, res, next)
		return await next()
	}

	if (provider === 'spotify') {
		const authenticator = createSpotifyPassport().authenticate("spotify", { session: false })
		authenticator(req, res, next)
		return await next()
	}

	throw new BadRequestException("Provider not recognized")
},
	(_req, res) => {
		res.redirect("/")
	}
);

export default router.handler({
	onError: onApiError,
})