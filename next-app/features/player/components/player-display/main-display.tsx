import { useCallback, useContext } from "react"
import { EmbedController } from "spotify.d"
import { PlayerContext } from "../player-context-component/player-context"
import { SpotifyPlayer } from "../spotify/display"
import { YoutubePlayer } from "../youtube/display"

function spotifyPlay(emb: EmbedController) {
	emb.play()
}
function youtubePlay(player: YT.Player, onEnded: () => void) {
	if(player.getDuration() === 0){
		onEnded();
		return
	}

	player.playVideo()
}

export function PlayerMainDisplay() {
	const { setCurrentTrackId, getCurrentTrackFromId, tracksList, currentTrackId } = useContext(PlayerContext)
	const currentTrack = getCurrentTrackFromId()

	const onEnded = useCallback(async () => {
		const trackIndex = tracksList.findIndex(x => x.trackId === currentTrackId)
		await setCurrentTrackId(tracksList.at(trackIndex + 1)?.trackId ?? tracksList[0].trackId)
	}, [currentTrackId, setCurrentTrackId, tracksList])

	if (tracksList.length == 0) {
		return <></>
	}

	if (currentTrack.trackType === "Spotify") {
		return (
			<SpotifyPlayer uri={currentTrack.remoteTrackId}
				onEnded={onEnded}
				onReady={spotifyPlay}
			/>
		)
	}


	return (
		<YoutubePlayer uri={currentTrack.remoteTrackId}
			onEnded={onEnded}
			onReady={youtubePlay}
		/>
	)
}