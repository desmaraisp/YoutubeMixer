const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { withSentryConfig } = require("@sentry/nextjs");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	publicRuntimeConfig: {
		projectID: process.env.PUBLIC_PROJECT_ID,
		firebaseApiKey: process.env.PUBLIC_FIREBASE_API_KEY,
		firebaseAuthDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
		firebaseStorageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
		firebaseMessagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		firebaseAppID: process.env.PUBLIC_FIREBASE_APPID,
	},
	serverRuntimeConfig: {
		firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
		firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		googleClientID: process.env.GOOGLE_CLIENT_ID,
		googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
		spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
		spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		youtubeApiKey: process.env.YOUTUBE_API_KEY
	}
}

module.exports = withVanillaExtract(nextConfig);
module.exports = withSentryConfig(
	module.exports,
	{
		silent: true,
		org: process.env.SENTRY_ORG,
		project: process.env.SENTRY_PROJECT,
	},
	{
		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Transpiles SDK to be compatible with IE11 (increases bundle size)
		transpileClientSDK: true,

		// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
		tunnelRoute: "/monitoring",

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,
	}
);
