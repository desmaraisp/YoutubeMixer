import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrementCurrentIndexToExternalStorage, incrementCurrentIndexToExternalStorage, shuffleTracksToExternalStorage } from "@/store/saved-tracks-reducer";
import { unStyledButton } from "@/styles/shared/button.css";
import { ellipsisText } from "@/styles/shared/ellipsis-text.css";
import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { faStepBackward, faStepForward, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { FirebaseAuthContext } from "./firebase-context";

export function TracksListHeader() {
	const state = useAppSelector(state => state.playerReducer)
	const currentUser = useContext(FirebaseAuthContext).user
	const dispatch = useAppDispatch()

	if (state.playlistItems.length == 0 || !state.playlistItems[state.currentIndex] || !currentUser) {
		return (<></>)
	}

	return (
		<div style={{paddingTop: "10px", borderBottom: "1px solid"}}>
			<div className={flexboxVariants.gapped}>
				<button className={unStyledButton} type="button" onClick={() => {
					dispatch(decrementCurrentIndexToExternalStorage(currentUser))
				}}>
					<FontAwesomeIcon
						icon={faStepBackward} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					dispatch(shuffleTracksToExternalStorage(currentUser))
				}}>
					<FontAwesomeIcon
						icon={faShuffle} />
				</button>
				<button className={unStyledButton} type="button" onClick={() => {
					dispatch(incrementCurrentIndexToExternalStorage(currentUser))
				}}>
					<FontAwesomeIcon
						icon={faStepForward} />
				</button>

			</div>
			<div style={{margin: "0px 40px"}} className={flexboxVariants.even}>
				<span className={ellipsisText}>{state.playlistItems[state.currentIndex].itemName}</span>
				<span>{state.currentIndex + 1}/{state.playlistItems.length}</span>
			</div>

		</div>
	)
}