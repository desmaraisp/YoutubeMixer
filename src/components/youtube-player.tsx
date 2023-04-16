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
	const [player, setPlayer] = useState<YT.Player | null>(null)

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
		if (!isReady || !window?.YT?.Player || !ref.current)
			return

		setPlayer(new window.YT.Player(ref.current, {
			width: '100%',
			height: '100%',
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
		}))
	}, [isReady, onEnded, onReady])

	useEffect(() => {
		if (!player)
			return

		player.loadVideoById(uri)
	}, [uri, player])



	return (
		<>
			<Script src="https://www.youtube.com/iframe_api" async />
			<div className={className} style={{ width: '100%', height: '100%' }}>
				<div ref={ref} />
			</div>
		</>
	)
}
