import { PlaylistModelWithId } from "@/features/playlist/playlist-schema";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Loader, Popover } from "@mantine/core";
import { AcceptPlaylistUpdateForm } from "./form";
import { useEffect, useState } from "react";
import { RemotePlaylistModelWithDetails } from "@/features/remote-playlist/remote-playlist-schema";
import { isApiError } from "@/lib/api-error-response";
import { GetRemotePlaylistContents } from "@/features/remote-playlist/components/import-component/fetcher";

export function PlaylistRefreshButton({ playlistData }: { playlistData: PlaylistModelWithId }) {
	const [opened, setOpened] = useState(false);

	return (<Popover opened={opened} onChange={setOpened}>
		<Popover.Target>
			<Button onClick={() => setOpened(true)} variant="subtle">
				<FontAwesomeIcon icon={faRefresh} />
			</Button>
		</Popover.Target>
		<Popover.Dropdown>
			<RefreshButtonDropdownInner playlistData={playlistData} cancelCallback={() => { setOpened(false) }} />
		</Popover.Dropdown>
	</Popover>)
}

function RefreshButtonDropdownInner({ playlistData, cancelCallback }: { playlistData: PlaylistModelWithId, cancelCallback: () => void }) {
	const [newPlaylistData, setNewPlaylistData] = useState<RemotePlaylistModelWithDetails>()

	useEffect(() => {
		const callback = async () => {
			const result = await GetRemotePlaylistContents({ playlistType: playlistData.playlistType, remotePlaylistId: playlistData.remotePlaylistId })

			if (isApiError(result)) {
				throw new Error(`Remote api returned error ${result.message}`)
			}

			setNewPlaylistData(result)
		}
		callback()
	}, [playlistData])

	if (!newPlaylistData) return <Loader />

	return <AcceptPlaylistUpdateForm
		currentPlaylistData={playlistData}
		newPlaylistData={newPlaylistData}
		cancelCallback={cancelCallback} />
}