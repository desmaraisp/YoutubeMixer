import { PlayerContext } from "@/contexts/player-context";
import { pushPlayerIndex, pushPlayerState } from "@/lib/frontend-services/fetch-services/push-player-state";
import { decrementPlayerIndex, incrementPlayerIndex } from "@/lib/frontend-services/player-state-functions";
import { ShuffleArray } from "@/lib/shuffle-array";
import { unStyledButton } from "@/styles/shared/button.css";
import { ellipsisText } from "@/styles/shared/ellipsis-text.css";
import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { faStepBackward, faStepForward, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export function TracksListHeader() {
	const { playerState, setPlayerState } = useContext(PlayerContext)
	const savedTracks = playerState.tracks
	const currentPlayerIndex = playerState.currentIndex

	if (savedTracks.length == 0 || !savedTracks[currentPlayerIndex]) {
		return (<></>)
	}

	return (
		<div style={{ paddingTop: "10px", borderBottom: "1px solid" }}>
			<div className={flexboxVariants.gapped}>
				<button className={unStyledButton} type="button" onClick={() => {
					pushPlayerIndex({ newIndex: decrementPlayerIndex(playerState)})
					setPlayerState((playerState) => {
						return {...playerState, currentIndex: decrementPlayerIndex(playerState)}
					})
				}}>
					<FontAwesomeIcon
						icon={faStepBackward} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					const newState = {
						currentIndex: 0,
						tracks: ShuffleArray(playerState.tracks)
					}
					pushPlayerState(newState)
					setPlayerState(newState)
				}}>
					<FontAwesomeIcon
						icon={faShuffle} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					pushPlayerIndex({ newIndex: incrementPlayerIndex(playerState)})
					setPlayerState((playerState) => {
						return {...playerState, currentIndex: incrementPlayerIndex(playerState)}
					})
				}}>
					<FontAwesomeIcon
						icon={faStepForward} />
				</button>

			</div>
			<div style={{ margin: "0px 40px" }} className={flexboxVariants.even}>
				<span className={ellipsisText}>{savedTracks[currentPlayerIndex].itemName}</span>
				<span>{currentPlayerIndex + 1}/{savedTracks.length}</span>
			</div>

		</div>
	)
}