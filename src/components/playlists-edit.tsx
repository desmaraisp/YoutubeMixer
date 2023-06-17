import { PlaylistModel } from '@/models/playlist-model';
import React, { useContext, useState } from 'react'
import { centeredText, centeredVariants } from '@/styles/shared/centered-item.css'
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { AddNewPlaylistForm } from './add-new-playlist-form/main-form';
import Link from 'next/link';
import { PlaylistsMenuItem } from './playlists-menu-item';
import { PlaylistLink } from './playlist-menu-controls/playlist-link';
import { DeletePlaylistButton } from './playlist-menu-controls/delete-playlist-button';
import { UserPlaylistsContext } from '@/contexts/user-playlists-context';
import { ShuffleArray } from '@/lib/shuffle-array';
import { useRouter } from 'next/router';
import { pushPlayerState } from '@/lib/frontend-services/fetch-services/push-player-state';
import { pushUserPlaylists } from '@/lib/frontend-services/fetch-services/push-user-playlists';

export function PlaylistsEdit() {
	const { userPlaylists } = useContext(UserPlaylistsContext)
	const [tempPlaylists, setTempPlaylists] = useState<PlaylistModel[]>(userPlaylists.playlists)
	const [shuffle, setShuffle] = useState(true)

	return (
		<div className={centeredVariants.p90}>
			<h2 className={centeredText}>Edit playlists</h2>

			<div className={flexboxVariants.centered} style={{ gap: "15px", rowGap: "15px", alignItems: "stretch", flexWrap: 'wrap' }}>
				{tempPlaylists.map((playlist) => {
					return <PlaylistsMenuItem
						key={playlist.uuid}
						Playlist={playlist}
						controls={
							<>
								<PlaylistLink Playlist={playlist} />
								<DeletePlaylistButton deleteHandler={() => setTempPlaylists((playlists) => {
									return playlists.filter(obj => obj.uuid !== playlist.uuid)
								})} />
							</>
						}
					/>
				})}
			</div>

			<AddNewPlaylistForm
				onNewItemAccepted={(newItem) => {
					setTempPlaylists((currentPlaylists) => {
						return [...currentPlaylists, newItem];
					})
				}}
			/>
			<div className={flexboxVariants.centered}>
				<label>
					Shuffle tracks
					<input type='checkbox' checked={shuffle} onChange={() => {
						setShuffle((current) => !current)
					}} />
				</label>

			</div>



			<div style={{ marginTop: "15px" }} className={flexboxVariants.gapped}>
				<SavePlaylistsButton playlistsToSave={tempPlaylists} shuffle={shuffle} />

				<button type='submit' onClick={() => {
					setTempPlaylists(userPlaylists.playlists)
				}}>Cancel changes</button>


				<Link href="/">Back</Link>

			</div>

		</div>
	)
}

function SavePlaylistsButton({ playlistsToSave, shuffle }: { playlistsToSave: PlaylistModel[], shuffle: boolean }) {
	const router = useRouter()
	const [message, setMessage] = useState<string | null>();


	return <>
		<button type='submit' onClick={async () => {
			const enabledPlaylists = playlistsToSave.filter(x => x.enabled === true)
			const playlistItems = enabledPlaylists.flatMap((playlist) => {
				return playlist.playlistItems
			})

			const result = await Promise.all([
				pushPlayerState({
					currentIndex: 0,
					tracks: shuffle ? ShuffleArray(playlistItems) : playlistItems
				}),
				pushUserPlaylists({
					playlists: playlistsToSave
				})
			]);
			if (result[0] !== null) {
				setMessage(result[0].message)
				return
			}
			if (result[1] !== null) {
				setMessage(result[1].message)
				return
			}

			router.push("/")

		}}>Save changes</button>
		{message && <div>{message}</div>}
	</>
}

