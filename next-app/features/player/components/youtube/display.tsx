import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

interface YoutubePlayerProps {
	uri: string,
	onEnded?: () => void
	onReady?: (player: YT.Player) => void
	className?: string
}
export function YoutubePlayer({ uri, onEnded = () => { }, onReady = () => { }, className = "" }: YoutubePlayerProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isReady, setIsReady] = useState(false)
	const player = useRef<YT.Player | null>(null)
	const uriRef = useRef('')

	useEffect(() => {
		if (!window?.YT?.Player) {
			window.onYouTubeIframeAPIReady = () => {
				setIsReady(true)
			}
		}
		else {
			setIsReady(true)
		}
	}, [])

	useEffect(() => {
		uriRef.current = uri
		if (!player.current?.loadVideoById)
			return

		player.current.loadVideoById(uri)

	}, [uri]);


	useEffect(() => {
		if (!isReady || !window?.YT?.Player || !ref.current)
			return

		player.current = new window.YT.Player(ref.current, {
			width: '100%',
			height: '100%',
			videoId: uriRef.current,
			events: {
				onReady: (ev) => {
					onReady(ev.target)
				},
				onStateChange: (ev) => {
					if (ev.data === YT.PlayerState.ENDED) {
						onEnded()
					}
				}
			}
		})

		return () => {player.current?.destroy()}
	}, [isReady, onEnded, onReady])

	return (
		<>
			<Script src="https://www.youtube.com/iframe_api" async />
			<div className={className} style={{ width: '100%', height: '100%' }}>
				<div ref={ref} />
			</div>
		</>
	)
}