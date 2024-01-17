import { faFastBackward, faFastForward, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text, Group, Stack, Paper } from "@mantine/core";
import { useContext } from "react";
import { PlayerContext } from "../player-context-component/player-context";
import { PlaylistTrackModelForPatch } from "@/features/playlist-track/playlist-track-schema";
import { PatchPlaylistItems } from "@/features/playlist-track/components/tracks-shuffle/fetcher";
import { useRouter } from "next/router";

export function PlayerMenu() {
	const { setCurrentTrackId, tracksList, currentTrackId, getCurrentTrackFromId } = useContext(PlayerContext)
	const router = useRouter()

	const currentTrackIndex = tracksList.findIndex(x => x.trackId === currentTrackId)

	return (
		<Paper withBorder p={'xs'}>
			<Stack gap={0}>
				<Text truncate ta='center'>{`(${currentTrackIndex + 1}/${tracksList.length}) ${getCurrentTrackFromId().trackName}`}</Text>
				<Group justify="space-evenly">
					<Button variant="transparent" onClick={async () => {
						await setCurrentTrackId(tracksList.at(currentTrackIndex - 1)?.trackId ?? tracksList[-1].trackId)
					}}>
						<FontAwesomeIcon icon={faFastBackward} />
					</Button>
					<Button variant="transparent" onClick={async () => {
						const payload = tracksList.map<PlaylistTrackModelForPatch>(x => ({ orderingKey: Math.random().toString(36).substring(3, 9), trackId: x.trackId }))

						await PatchPlaylistItems(payload)
						router.push(router.asPath)
					}}>
						<FontAwesomeIcon icon={faShuffle} />
					</Button>
					<Button variant="transparent" onClick={async () => {
						await setCurrentTrackId(tracksList.at(currentTrackIndex + 1)?.trackId ?? tracksList[0].trackId)
					}}>
						<FontAwesomeIcon icon={faFastForward} />
					</Button>
				</Group>
			</Stack>
		</Paper>
	)
}