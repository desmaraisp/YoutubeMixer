import {use} from "passport";
import { Strategy as SpotifyStrategy, VerifyCallback, Profile, } from 'passport-spotify'
import { Request } from 'express'
import { setRefreshTokensToDB } from "../firestore/get-set-db-refresh-token";
import { getPrivateConfiguration } from "@/configuration";

export function createSpotifyPassport() {
	const passport = use(
		new SpotifyStrategy(
			{
				clientID: getPrivateConfiguration().spotifyClientID,
				clientSecret: getPrivateConfiguration().spotifyClientSecret,
				callbackURL: "/api/auth/oauth2/redirect/spotify",
				passReqToCallback: true
			},
			async (req: Request, _accessToken: string, refreshToken: string, _expires_in: number, _profile: Profile, done: VerifyCallback) => {
				const { state } = req.query
				await setRefreshTokensToDB(state as string, { spotifyRefreshToken: refreshToken })
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