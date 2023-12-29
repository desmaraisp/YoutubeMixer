import React from "react";
import { Alert, Button, Card, Group, Table, TableData } from "@mantine/core";
import { PlaylistModelWithId } from "../../playlist-schema";
import { DeleteButton } from "@/components/delete-button";
import { DeletePlaylist } from "../delete-component/fetcher";
import { WrappedWithErrorHandler } from "@/components/errors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCross, faRefresh, faX } from "@fortawesome/free-solid-svg-icons";
import { PlaylistLink } from "./playlist-link";
import { PlaylistRefreshButton } from "../refresh-component/refresh-button";

export function PlaylistsDisplayTable({ playlists }: { playlists: PlaylistModelWithId[] }) {
	if (playlists.length === 0) {
		return <Alert>No items to display</Alert>
	}

	const tableData: TableData = {
		head: ['Name', 'tracks', 'link', 'status', ''],
		body: playlists.map(c => [
			c.playlistName,
			c.playlistItems.length,
			<PlaylistLink key={c.playlistId} Playlist={c} />,
			<FontAwesomeIcon key={c.playlistId} icon={c.enabled ? faCheck : faX} />,
			<TableRowControl key={c.playlistId} playlist={c} />
		])
	};

	return <Card withBorder m="md">
		<Table data={tableData} />
	</Card>
}

function TableRowControl({ playlist }: { playlist: PlaylistModelWithId }) {

	return (
		<WrappedWithErrorHandler>
			<Group justify="space-evenly">
				<PlaylistRefreshButton playlistData={playlist} />
				<DeleteButton deleteCallback={async () => await DeletePlaylist(playlist.playlistId)} />
			</Group>
		</WrappedWithErrorHandler>
	)
}
