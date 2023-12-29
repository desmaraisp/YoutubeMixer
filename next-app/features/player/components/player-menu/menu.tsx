import { faFastBackward, faFastForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text, Group, Stack } from "@mantine/core";
import { useContext } from "react";
import { PlayerContext } from "../player-context-component/player-context";

export function PlayerMenu() {
	const { setCurrentTrackId, tracksList, currentTrackId, getCurrentTrackFromId } = useContext(PlayerContext)

	return (
		<Stack>
			<Text truncate ta='center'>{getCurrentTrackFromId().trackName}</Text>
			<Group justify="space-evenly">
				<Button variant="transparent" onClick={async () => {
					const trackIndex = tracksList.findIndex(x => x.trackId === currentTrackId)
					setCurrentTrackId(tracksList.at(trackIndex + 1)?.trackId ?? tracksList[0].trackId)
				}}>
					<FontAwesomeIcon icon={faFastBackward} />
				</Button>
				<Button variant="transparent" onClick={async () => {
					const trackIndex = tracksList.findIndex(x => x.trackId === currentTrackId)
					setCurrentTrackId(tracksList.at(trackIndex - 1)?.trackId ?? tracksList[-1].trackId)
				}}>
					<FontAwesomeIcon icon={faFastForward} />
				</Button>
			</Group>
		</Stack>
	)
}