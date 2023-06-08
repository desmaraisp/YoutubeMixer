import { GoogleCallbackParameters, Profile, Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { use } from "passport";
import { Request } from 'express'
import { setRefreshTokensToDB } from "../firestore/get-set-db-refresh-token";
import { getPrivateConfiguration } from "@/configuration";

export function createGooglePassport() {
	const passport = use(
		new GoogleStrategy(
			{
				clientID: getPrivateConfiguration().googleClientID,
				clientSecret: getPrivateConfiguration().googleClientSecret,
				callbackURL: "/api/auth/oauth2/redirect/google",
				passReqToCallback: true
			},
			async (req: Request, _accessToken: string, refreshToken: string, _params: GoogleCallbackParameters, _profile: Profile, done: VerifyCallback) => {
				const { state } = req.query
				await setRefreshTokensToDB(state as string, { googleRefreshToken: refreshToken })
			}
		)
	);


	// passport.serializeUser stores user object passed in the cb method above in req.session.passport
	passport.serializeUser((user, done) => {
		return done(null, user);
	});

	// passport.deserializeUser stores the user object in req.user
	passport.deserializeUser((user: Express.User, cb) => {
		return cb(null, user);
	});

	return passport
}