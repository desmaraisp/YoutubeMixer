import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { useCallback, useContext } from "react";
import { SpotifyPlayer } from "./spotify-player";
import { YoutubePlayer } from "./youtube-player";
import { EmbedController } from "spotify.d";
import { PlayerContext } from "@/contexts/player-context";
import { incrementPlayerIndex } from "@/lib/frontend-services/player-state-functions";
import { pushPlayerIndex } from "@/lib/frontend-services/fetch-services/push-player-state";

function spotifyPlay(emb: EmbedController) {
	emb.play()
}
function youtubePlay(player: YT.Player) {
	player.playVideo()
}

export function Player({ className }: { className?: string }) {
	const { playerState, setPlayerState } = useContext(PlayerContext)
	const savedTracks = playerState.tracks
	const currentPlayerIndex = playerState.currentIndex
	const currentTrack = savedTracks[currentPlayerIndex]

	const onEnded = useCallback(() => {
		pushPlayerIndex({ newIndex: incrementPlayerIndex(playerState)})
		setPlayerState((playerState) => {
			return {...playerState, currentIndex: incrementPlayerIndex(playerState)}
		})
	}, [setPlayerState, playerState])

	if (savedTracks.length == 0 || !currentTrack) {
		return <></>
	}


	if (currentTrack.type === "Spotify") {
		return (
			<div className={className}>
				<SpotifyPlayer className={flexboxVariants.centered} uri={currentTrack.itemID}
					key={currentTrack.uuid}
					onEnded={onEnded}
					onReady={spotifyPlay}
				/>
			</div>
		)
	}


	return (
		<div className={className}>
			<YoutubePlayer key={currentTrack.uuid} uri={currentTrack.itemID}
				onEnded={onEnded}
				onReady={youtubePlay}
			/>
		</div>
	)
}