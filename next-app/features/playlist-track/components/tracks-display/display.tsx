import { PlaylistTrackModelWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { Alert, Card, ScrollArea, Table } from "@mantine/core";
import { useContext } from "react";
import { PlayerContext } from "../../../player/components/player-context-component/player-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";

export function TracksListDisplayTable({ tracks }: { tracks: PlaylistTrackModelWithTrackType[] }) {
	const { currentTrackId, setCurrentTrackId } = useContext(PlayerContext)

	if (tracks.length === 0) {
		return <Alert>No items to display</Alert>
	}

	return <Card withBorder shadow="lg">
		<ScrollArea scrollbars='y' h={350}>
			<Table withTableBorder withRowBorders>
				<Table.Tbody>
					{
						tracks.map(x => {
							const icon = x.trackType === 'Spotify' ? <FontAwesomeIcon icon={faSpotify}/> : <FontAwesomeIcon icon={faYoutube}/>

							return <Table.Tr onClick={() => setCurrentTrackId(x.trackId)} style={{ backgroundColor: currentTrackId === x.trackId ? "blueviolet" : undefined }} key={x.trackId}>
								<Table.Td>
									{icon}
								</Table.Td>
								<Table.Td>
									{x.trackName}
								</Table.Td>
							</Table.Tr>
						})
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>
	</Card>
}