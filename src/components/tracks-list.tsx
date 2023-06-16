import { TrackModel } from "@/models/track-model";
import { alternatingBackgroundTable, tableCell, tableRow } from "@/styles/shared/tables.css";
import { ellipsisText } from "@/styles/shared/ellipsis-text.css";
import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { highlighted } from "@/styles/shared/highlighted.css";
import { TracksListHeader } from "./tracks-list-header";
import { unStyledButton } from "@/styles/shared/button.css";
import { fullWidth } from "@/styles/shared/full-size.css";
import { useContext } from "react";
import { PlayerContext } from "@/contexts/player-context";
import { setCurrentIndex } from "@/lib/frontend-services/player-state-functions";

type TracksListRowType = {
	playlistItem: TrackModel;
	isCurrentlyPlayingTrack: boolean;
	currentIndex: number;
};

function TracksListRow({ playlistItem, isCurrentlyPlayingTrack, currentIndex }: TracksListRowType) {
	const baseRowClass = `${tableRow} ${flexboxVariants.leftAligned} ${unStyledButton}`
	const rowClassName = isCurrentlyPlayingTrack ? `${highlighted} ${baseRowClass}` : baseRowClass
	const { setPlayerState } = useContext(PlayerContext)

	return (
		<button style={{ alignItems: 'stretch' }} className={rowClassName} type="button" onClick={ () => {
			setPlayerState((playerState) => { return setCurrentIndex(playerState, currentIndex) })
		}}>
			<div style={{ width: "90px", height: "90px", backgroundColor: "black", flexShrink: 0 }} className={`${flexboxVariants.centered} ${tableCell}`}>
				<img className={fullWidth} src={playlistItem.itemImageURL} alt={playlistItem.itemName} />
			</div>

			<div style={{ flexGrow: 1, overflow: 'hidden', padding: "10px" }} className={`${flexboxVariants.leftAligned} ${tableCell}`}>
				<div style={{ textAlign: 'left' }} className={ellipsisText}>
					{playlistItem.itemName}
				</div>

			</div>

		</button>

	);

}

export function TracksList({ className }: { className?: string }) {
	const { playerState } = useContext(PlayerContext)
	const savedTracks = playerState.tracks
	const currentPlayerIndex = playerState.currentIndex

	if (savedTracks.length == 0 || !savedTracks[currentPlayerIndex]) {
		return (<></>)
	}

	return (
		<div className={`${className}`}>
			<div className={flexboxVariants.vertical} style={{ minHeight: "100%" }}>
				<TracksListHeader />
				<div style={{ overflowY: "scroll", maxHeight: "90vh", flexGrow: 1 }}>

					<div className={alternatingBackgroundTable}>
						{savedTracks.map((item, index) => {
							return <TracksListRow
								currentIndex={index}
								key={item.uuid}
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