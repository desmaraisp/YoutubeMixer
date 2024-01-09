import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { EmbedController, StateChangeEvent } from 'spotify.d'

function onStateChange(event: StateChangeEvent, onEnded: () => void) {
	const { data } = event

	if (data.position >= data.duration && data.position && data.duration) {
		onEnded()
	}
}

interface SpotifyPlayerProps {
	uri: string,
	onEnded?: () => void
	onReady?: (emb: EmbedController) => void
}
export function SpotifyPlayer({ uri, onEnded = () => { }, onReady = () => { } }: SpotifyPlayerProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isReady, setIsReady] = useState(false)
	const embedController = useRef<EmbedController | null>(null)

	useEffect(() => {
		if (!window?.SpotifyIframeApi) {
			window.onSpotifyIframeApiReady = (api) => {
				window.SpotifyIframeApi = api
				setIsReady(true)
			}
		}
		else {
			setIsReady(true)
		}
	}, [])

	useEffect(() => {
		if (!isReady || !window?.SpotifyIframeApi || !ref.current)
			return

		window.SpotifyIframeApi.createController(
			ref.current,
			{},
			(emb) => {
				embedController.current = emb
				emb.loadUri(`spotify:track:${uri}`)
				emb.addListener("ready", () => {
					if(window.hasStartedSpotifyGesture) onReady(emb)
				})
				emb.addListener("playback_update", (e) => {
					if(!window.hasStartedSpotifyGesture) window.hasStartedSpotifyGesture = true
					onStateChange(e, onEnded)
				})
			}
		)

		return () => { embedController.current?.destroy() }

	}, [isReady, onEnded, onReady, uri])



	return (
		<>
			<Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async />
			<div style={{ width: '100%', height: '100%' }}>
				<div>
					<div ref={ref} />
				</div>
			</div>
		</>
	)
}