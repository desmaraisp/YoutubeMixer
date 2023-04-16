import { isApiError } from "@/models/api-models/api-error-response"
import { GetLoggedInCustomProvidersSuccessResponse, GetLoggedInCustomProvidersResponseSchema } from "@/models/api-models/get-logged-in-custom-providers-model"
import { roundedSeparator } from "@/styles/shared/separator.css"
import { spinner } from "@/styles/shared/spinner.css"
import { getIdToken, User } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { ErrorMessage } from "../error-message"
import { AuthenticationMenuWidget } from "./authentication-menu-widget"


export function ConnectAccount({ user }: { user: User }) {
	const [authorizationState, setAuthorizationState] = useState<GetLoggedInCustomProvidersSuccessResponse | null>(null)
	const [tokenID, setTokenID] = useState('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const isGoogleAccountLoggedIn = user.providerData.some((profile) => profile.providerId === "google.com")

	const fetchLoggedInProviders = useCallback(async () => {
		setErrorMessage(null)
		try {
			var response = await fetch("/api/auth/get-logged-in-custom-providers", {
				headers: {
					Authorization: await getIdToken(user)
				}
			})
		}
		catch (e) {
			if (e instanceof Error) {
				setErrorMessage(e.message)
				return
			}
			throw e
		}

		const result = GetLoggedInCustomProvidersResponseSchema.parse(await response.json())
		if (isApiError(result)) {
			setErrorMessage(result.message)
			return
		}

		setAuthorizationState(result)
		setTokenID(await getIdToken(user))
	}, [user])

	useEffect(() => {
		fetchLoggedInProviders()
	}, [fetchLoggedInProviders])

	return (
		<AuthenticationMenuWidget title={"Connect external account"} description={<p>Connecting an account allows you list the private playlists of that account</p>}>
			<hr style={{ width: "100%" }} className={roundedSeparator} />

			<ProviderConnect
				authorizationState={authorizationState}
				isGoogleAccountLoggedIn={isGoogleAccountLoggedIn}
				tokenID={tokenID}
				errorMessage={errorMessage}
				retryHandler={fetchLoggedInProviders} />

			<hr style={{ width: "100%" }} className={roundedSeparator} />
			<Link href="/">Back</Link>
		</AuthenticationMenuWidget>
	)
}

function ProviderConnect({ isGoogleAccountLoggedIn, tokenID, authorizationState, errorMessage, retryHandler }: { authorizationState: GetLoggedInCustomProvidersSuccessResponse | null; isGoogleAccountLoggedIn: boolean; tokenID: string, errorMessage: string | null, retryHandler: () => void }) {
	if (errorMessage) {
		return (
			<>
				<ErrorMessage message={errorMessage} header='Something went wrong' />
				<button type="button" name="try-again" onClick={retryHandler}>Try again</button>
			</>
		)
	}

	if (!authorizationState) {
		return (<div className={spinner} />)
	}

	return (
		<>
			<SpotifyConnect isSpotifyAuthorized={authorizationState.isSpotifyLoggedIn} tokenID={tokenID} />
			<GoogleConnect isGoogleAuthorized={authorizationState.isGoogleLoggedIn} isGoogleAccountLoggedIn={isGoogleAccountLoggedIn} tokenID={tokenID} />

		</>
	)



}

function GoogleConnect({ isGoogleAuthorized, isGoogleAccountLoggedIn, tokenID }: { isGoogleAuthorized: boolean; isGoogleAccountLoggedIn: boolean; tokenID: string }) {
	const router = useRouter()

	if (isGoogleAuthorized) return <span>Your google account is already connected</span>

	if (isGoogleAccountLoggedIn) return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/google?tokenID=${tokenID}`)}
		>You are already logged in with google, but the application requires additional permissions to access your youtube account</button>
	)

	return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/google?tokenID=${tokenID}`)}
		>Connect with Google</button>
	)
}
function SpotifyConnect({ isSpotifyAuthorized, tokenID }: { isSpotifyAuthorized: boolean; tokenID: string }) {
	const router = useRouter()

	if (isSpotifyAuthorized) return <span>Your spotify account is already connected</span>

	return (
		<button
			onClick={() => router.push(`/api/auth/oauth2/login/spotify?tokenID=${tokenID}`)}
		>Connect with spotify</button>
	)
}
