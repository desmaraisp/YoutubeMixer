import { PlaylistTrackModelWithId } from "@/features/playlist-track/playlist-track-schema";
import { Alert, Card, ScrollArea, Table, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { PlayerContext } from "../../../player/components/player-context-component/player-context";

export function TracksListDisplayTable({ tracks }: { tracks: PlaylistTrackModelWithId[] }) {
	const { currentTrackId, setCurrentTrackId } = useContext(PlayerContext)

	if (tracks.length === 0) {
		return <Alert>No items to display</Alert>
	}

	return <Card withBorder shadow="lg">
		<ScrollArea scrollbars='y' h={350}>
			<Table withTableBorder withRowBorders>
				<Table.Tbody>
					{
						tracks.map(x => (
							<Table.Tr onClick={() => setCurrentTrackId(x.trackId)} style={{ backgroundColor: currentTrackId === x.trackId ? "blueviolet" : undefined }} key={x.trackId}>
								<Table.Td>
									Image
								</Table.Td>
								<Table.Td>
									{x.trackName}
								</Table.Td>
								<Table.Td>
									{x.trackId}
								</Table.Td>
							</Table.Tr>
						))
					}
				</Table.Tbody>
			</Table>
		</ScrollArea>
	</Card>
}