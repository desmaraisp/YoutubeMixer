import { isApiError } from "@/models/api-models/api-error-response"
import { roundedSeparator } from "@/styles/shared/separator.css"
import { spinner } from "@/styles/shared/spinner.css"
import { User } from "next-auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { AuthenticationMenuWidget } from "./authentication-menu-widget"
import { ErrorMessage } from "../errors"
import { fetchLoggedInProvidersFromAPI } from "@/lib/frontend-services/fetch-services/fetch-logged-in-providers-from-api"
import { TokensApiResponseModel } from "@/models/api-models/user-refresh-tokens"


export function ConnectAccount({ user }: { user: User }) {
	const [authorizationState, setAuthorizationState] = useState<TokensApiResponseModel|null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const isGoogleAccountLoggedIn = user.provider === "google.com"

	const fetchLoggedInProviders = useCallback(async () => {
		setErrorMessage(null)
		const result = await fetchLoggedInProvidersFromAPI()
		if (isApiError(result)) {
			setErrorMessage(result.message)
			return
		}

		setAuthorizationState(result)
	}, [setErrorMessage, setAuthorizationState])

	useEffect(() => {
		fetchLoggedInProviders()
	}, [fetchLoggedInProviders])

	return (
		<AuthenticationMenuWidget title={"Connect external account"} description={<p>Connecting an account allows you list the private playlists of that account</p>}>
			<hr style={{ width: "100%" }} className={roundedSeparator} />

			<ProviderConnect
				authorizationState={authorizationState}
				isGoogleAccountLoggedIn={isGoogleAccountLoggedIn}
				errorMessage={errorMessage}
				retryHandler={fetchLoggedInProviders} />

			<hr style={{ width: "100%" }} className={roundedSeparator} />
			<Link href="/">Back</Link>
		</AuthenticationMenuWidget>
	)
}

function ProviderConnect({ isGoogleAccountLoggedIn, authorizationState, errorMessage, retryHandler }: { authorizationState: TokensApiResponseModel | null; isGoogleAccountLoggedIn: boolean, errorMessage: string | null, retryHandler: () => void }) {
	if (errorMessage) {
		return (
			<>
				<ErrorMessage message={errorMessage} />
				<button type="button" name="try-again" onClick={retryHandler}>Try again</button>
			</>
		)
	}

	if (!authorizationState) {
		return (<div className={spinner} />)
	}

	return (
		<>
			<SpotifyConnect isSpotifyAuthorized={authorizationState.isSpotifyLoggedIn} />
			<GoogleConnect isGoogleAuthorized={authorizationState.isGoogleLoggedIn} isGoogleAccountLoggedIn={isGoogleAccountLoggedIn} />

		</>
	)



}

function GoogleConnect({ isGoogleAuthorized, isGoogleAccountLoggedIn }: { isGoogleAuthorized: boolean; isGoogleAccountLoggedIn: boolean }) {
	const router = useRouter()

	if (isGoogleAuthorized) return <span>Your google account is already connected</span>

	if (isGoogleAccountLoggedIn) return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/google`)}
		>You are already logged in with google, but the application requires additional permissions to access your youtube account</button>
	)

	return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/google`)}
		>Connect with Google</button>
	)
}
function SpotifyConnect({ isSpotifyAuthorized }: { isSpotifyAuthorized: boolean }) {
	const router = useRouter()

	if (isSpotifyAuthorized) return <span>Your spotify account is already connected</span>

	return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/spotify`)}
		>Connect with spotify</button>
	)
}
