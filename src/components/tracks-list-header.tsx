import { PlayerContext } from "@/contexts/player-context";
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
					setPlayerState(decrementPlayerIndex)
				}}>
					<FontAwesomeIcon
						icon={faStepBackward} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					setPlayerState((playerState) => {
						return {
							currentIndex: 0,
							tracks: ShuffleArray(playerState.tracks)
						}
					})
				}}>
					<FontAwesomeIcon
						icon={faShuffle} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					setPlayerState(incrementPlayerIndex)
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