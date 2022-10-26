import { PlaylistModel } from '@/models/playlist-model';
import React, { useContext, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { centeredText, centeredVariants } from '@/styles/shared/centered-item.css'
import { savePlaylistsToExternalStorage } from '../store/saved-playlists-reducer';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { AddNewPlaylistForm } from './add-new-paylist';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setTracksListToExternalStorage } from '@/store/saved-tracks-reducer';
import { signInAnonymously } from 'firebase/auth'
import { clientAuth } from '@/firebase-config';
import { FirebaseAuthContext } from './firebase-context';
import { PlaylistsMenuItem } from './playlists-menu-item';
import { useEffect } from 'react';
import { PlaylistLink } from './playlist-menu-controls/playlist-link';
import { DeletePlaylistButton } from './playlist-menu-controls/delete-playlist-button';

export function PlaylistsEdit() {
	const playlists = useAppSelector(state => state.playlistsReducer.playlists)
	const [tempPlaylists, setTempPlaylists] = useState<PlaylistModel[]>([])

	useEffect(() => {
		setTempPlaylists(playlists)
	}, [playlists])

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



			<div style={{ marginTop: "15px" }} className={flexboxVariants.gapped}>
				<SavePlaylistsButton playlistsToSave={tempPlaylists} />

				<button type='submit' onClick={() => {
					setTempPlaylists(playlists)
				}}>Cancel changes</button>


				<Link href="/">Back</Link>

			</div>

		</div>
	)
}

function SavePlaylistsButton({ playlistsToSave }: { playlistsToSave: PlaylistModel[] }) {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const currentUser = useContext(FirebaseAuthContext).user

	return <button type='submit' onClick={async () => {
		var user = currentUser ?? (await signInAnonymously(clientAuth)).user

		dispatch(savePlaylistsToExternalStorage({ user: user, newPlaylists: playlistsToSave }));
		dispatch(setTracksListToExternalStorage({
			user: user,
			newTracks: playlistsToSave.filter(x => x.enabled === true)
		}))

		router.push("/");
	}}>Save changes</button>;
}

