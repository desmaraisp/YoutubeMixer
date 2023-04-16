import { spotifyPlayerStyle } from '@/styles/component-specific/spotify-player.css'
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
	className?: string
}
export function SpotifyPlayer({ uri, onEnded = () => { }, onReady = () => { }, className = "" }: SpotifyPlayerProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isReady, setIsReady] = useState(false)
	const [embedController, setEmbedController] = useState<EmbedController | null>(null)

	useEffect(() => {
		if (!window?.SpotifyIframeApi) {
			window.onSpotifyIframeApiReady = () => {
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
				setEmbedController(emb)
				emb.addListener("ready", () => onReady(emb))
				emb.addListener("playback_update", (e) => onStateChange(e, onEnded))
			}
		)
	}, [isReady, onEnded, onReady])

	useEffect(() => {
		if (!embedController)
			return

		embedController.loadUri(uri)
	}, [uri, embedController])



	return (
		<>
			<Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async />
			<div className={className} style={{ width: '100%', height: '100%' }}>
				<div className={spotifyPlayerStyle}>
					<div ref={ref} />
				</div>
			</div>
		</>
	)
}
