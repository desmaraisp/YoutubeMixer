import { IFrameAPI } from "spotify.d"

declare global {
	interface Window {
		SpotifyIframeApi?: IFrameAPI
		onSpotifyIframeApiReady?: (IFrameAPI: IFrameAPI) => void
		onYouTubeIframeAPIReady?: () => void
	}
}