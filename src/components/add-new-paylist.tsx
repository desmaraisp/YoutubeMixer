import { PlaylistModel } from '@/models/playlist-model';
import { PlaylistRequestModel } from "@/models/api-models/playlist-api-models";
import React, { useContext, useState } from 'react';
import { PlaylistTypesEnum, PlaylistTypes } from '@/models/playlist-types';
import { v4 as uuidv4 } from 'uuid';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { centeredVariants } from '@/styles/shared/centered-item.css';
import { borderedPadded } from '@/styles/shared/bordered-padded.css';
import { fetchPlaylistFromAPI } from '@/lib/fetch-playlist-from-api';
import { verticalMargins } from '@/styles/shared/vertical-margins.css';
import { FirebaseAuthContext } from './firebase-context';
import { spinner } from '@/styles/shared/spinner.css';
import { ErrorMessage } from './error-message';
import { isApiError } from '@/models/api-models/api-error-response';


function ConfirmationPrompt({ onAcceptPlaylist, onRejectPlaylist, Playlist }: { Playlist: PlaylistModel, onAcceptPlaylist: () => void, onRejectPlaylist: () => void }) {
	return (
		<>
			<p>{Playlist.playlistItems.length} items found.</p>
			<div className={flexboxVariants.gapped}>
				<button type='button' onClick={onAcceptPlaylist}>
					Accept
				</button>
				<button type='button' onClick={onRejectPlaylist}>Reject</button>

			</div>
		</>
	)
}


export function AddNewPlaylistForm({ onNewItemAccepted }: { onNewItemAccepted: (newPlaylist: PlaylistModel) => void }) {
	const [newPlaylistID, setNewPlaylistID] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null)
	const [newPlaylistType, setNewPlaylistType] = useState<PlaylistTypes>(PlaylistTypesEnum.Enum.Youtube);
	const [newPlaylistModel, setNewPlaylistModel] = useState<PlaylistModel | null>(null)
	const currentUser = useContext(FirebaseAuthContext)

	return (
		<div className={`${centeredVariants.p80} ${borderedPadded} ${verticalMargins.v30}`}>
			<div className={flexboxVariants.gapped}>
				<input type="text" value={newPlaylistID} onChange={(e) => setNewPlaylistID(e.target.value)} />


				<select onChange={(e) => {
					const playlistTypeKey = PlaylistTypesEnum.parse(e.target.value)
					setNewPlaylistType(playlistTypeKey);
				}}>
					{Object.entries(PlaylistTypesEnum.Values).map(([key, value]) => {
						return <option key={key} value={key}>{value}</option>;
					})}
				</select>


				<button type='button' onClick={async () => {
					setError(null)

					if (newPlaylistID === "") {
						setError("Required")
						return
					}

					setIsLoading(true)
					const requestPayload: PlaylistRequestModel = {
						playlistID: newPlaylistID,
						playlistType: newPlaylistType,
					};
					const result = await fetchPlaylistFromAPI(requestPayload, currentUser.user)

					setIsLoading(false)
					if (isApiError(result)) {
						setError(result.message)
						return
					}

					setNewPlaylistModel({
						enabled: true,
						...result,
						uuid: uuidv4()
					})
				}}>Search</button>
			</div>
			<div className={flexboxVariants.verticalCentered}>
				{
					isLoading && <div className={spinner} />
				}
				{
					error && <ErrorMessage message={error} header='Something went wrong' />
				}
				{
					newPlaylistModel && <ConfirmationPrompt
						Playlist={newPlaylistModel} onAcceptPlaylist={() => {
							onNewItemAccepted(newPlaylistModel)
							setNewPlaylistID("")
							setNewPlaylistModel(null)
						}} onRejectPlaylist={() => {
							setNewPlaylistID("")
							setNewPlaylistModel(null)
						}} />
				}

				{
					!newPlaylistModel && newPlaylistType === 'Youtube' && <YoutubeDoc />
				}
				{
					!newPlaylistModel && newPlaylistType === 'Spotify' && <SpotifyDoc />
				}

			</div>

		</div>
	);
}


function YoutubeDoc() {
	return (<p>youtube documentation +  gif</p>)
}
function SpotifyDoc() {
	return (<p>spotify documentation +  gif</p>)
}