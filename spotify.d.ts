declare module 'spotify.d' {
	export class IFrameAPI {
		createController(
				element: HTMLElement,
				options: {uri?: string, width?: string, height?: string},
				callback: (EmbedController: EmbedController) => void
		): void
	}

	interface StateChangeEvent {
		data: {
			duration: number,
			position: number,
			isPaused: boolean,
			isBuffering: boolean
		}
	}

	export class EmbedController {
		loadUri(spotifyUri: string): void
		play(): void
		togglePlay(): void
		seek(seconds: int): void
		destroy(): void
		addListener(eventType: 'ready', callback: () => void);
		addListener(eventType: 'playback_update', callback: (event: StateChangeEvent) => void);
	}
}