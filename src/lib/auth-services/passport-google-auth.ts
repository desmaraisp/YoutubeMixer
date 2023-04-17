import { GoogleCallbackParameters, Profile, Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import passport from "passport";
import { Request } from 'express'
import { setRefreshTokensToDB } from "../firestore/get-set-db-refresh-token";
import { applicationConfig, throwValidationError } from "@/configuration";

passport.use(
	new GoogleStrategy(
		{
			clientID: applicationConfig.googleClientID ?? throwValidationError("GOOGLE_CLIENT_ID"),
			clientSecret: applicationConfig.googleClientSecret ?? throwValidationError("GOOGLE_CLIENT_SECRET"),
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

// for broader explanation of serializeUser and deserializeUser visit https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

// An article that explains the concept of process.nextTick https://nodejs.dev/learn/understanding-process-nexttick

export default passport;