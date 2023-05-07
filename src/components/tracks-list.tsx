import { PlaylistItem } from "@/models/playlist-item";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCurrentIndexToExternalStorage } from "@/store/saved-tracks-reducer";
import { alternatingBackgroundTable, tableCell, tableRow } from "@/styles/shared/tables.css";
import { ellipsisText } from "@/styles/shared/ellipsis-text.css";
import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { highlighted } from "@/styles/shared/highlighted.css";
import { TracksListHeader } from "./tracks-list-header";
import { useContext } from "react";
import { FirebaseAuthContext } from "./firebase-context";
import { User } from "firebase/auth";
import { unStyledButton } from "@/styles/shared/button.css";
import { fullWidth } from "@/styles/shared/full-size.css";

type TracksListRowType = {
	playlistItem: PlaylistItem;
	isCurrentlyPlayingTrack: boolean;
	currentIndex: number;
	currentUser: User
};

function TracksListRow({ playlistItem, isCurrentlyPlayingTrack, currentIndex, currentUser }: TracksListRowType) {
	const dispatch = useAppDispatch()
	const baseRowClass = `${tableRow} ${flexboxVariants.leftAligned} ${unStyledButton}`
	const rowClassName = isCurrentlyPlayingTrack ? `${highlighted} ${baseRowClass}` : baseRowClass

	return (
		<button style={{alignItems: 'stretch'}} className={rowClassName} type="button" onClick={() => dispatch(setCurrentIndexToExternalStorage({ user: currentUser, newIndex: currentIndex }))}>
			<div style={{ width: "90px", height: "90px", backgroundColor: "black", flexShrink: 0 }} className={`${flexboxVariants.centered} ${tableCell}`}>
				<img className={fullWidth} src={playlistItem.itemImageURL} alt={playlistItem.itemName} />
			</div>

			<div style={{ flexGrow: 1, overflow: 'hidden', padding: "10px" }} className={`${flexboxVariants.leftAligned} ${tableCell}`}>
				<div style={{ textAlign: 'left'}} className={ellipsisText}>
					{playlistItem.itemName}
				</div>
				
			</div>

		</button>

	);

}

export function TracksList({ className }: { className?: string }) {
	const savedTracks = useAppSelector(state => state.playerReducer.playlistItems)
	const currentPlayerIndex = useAppSelector(state => state.playerReducer.currentIndex)
	const currentUser = useContext(FirebaseAuthContext).user

	if (savedTracks.length == 0 || !savedTracks[currentPlayerIndex] || !currentUser) {
		return (<></>)
	}

	return (
		<div className={`${className}`}>
			<div className={flexboxVariants.vertical} style={{minHeight: "100%"}}>
				<TracksListHeader />
				<div style={{ overflowY: "scroll", maxHeight: "90vh", flexGrow: 1 }}>

					<div className={alternatingBackgroundTable}>
						{savedTracks.map((item, index) => {
							return <TracksListRow
								currentIndex={index}
								key={item.uuid}
								currentUser={currentUser}
								playlistItem={item}
								isCurrentlyPlayingTrack={index === currentPlayerIndex}
							/>
						})}

					</div>
				</div>

			</div>
		</div>
	)
}