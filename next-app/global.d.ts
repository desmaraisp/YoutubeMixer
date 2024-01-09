import { IFrameAPI } from "spotify.d"

declare global {
	interface Window {
		SpotifyIframeApi?: IFrameAPI
		hasStartedSpotifyGesture: boolean | undefined
		onSpotifyIframeApiReady?: (IFrameAPI: IFrameAPI) => void
		onYouTubeIframeAPIReady?: () => void
	}
}