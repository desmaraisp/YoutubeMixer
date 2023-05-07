import { PlaylistModel } from '@/models/playlist-model';
import { PlaylistRequestModel } from "@/models/api-models/playlist-api-models";
import React, { useContext, useState } from 'react';
import { PlaylistTypesEnum } from '@/models/playlist-types';
import { v4 as uuidv4 } from 'uuid';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { centeredVariants } from '@/styles/shared/centered-item.css';
import { borderedPadded } from '@/styles/shared/bordered-padded.css';
import { fetchPlaylistFromAPI } from '@/lib/fetch-playlist-from-api';
import { verticalMargins } from '@/styles/shared/vertical-margins.css';
import { FirebaseAuthContext } from '../firebase-context';
import { spinner } from '@/styles/shared/spinner.css';
import { isApiError } from '@/models/api-models/api-error-response';
import { YoutubeDoc } from './youtube-documentation';
import { SpotifyDoc } from './spotify-documentation';
import { ConfirmationPrompt } from './confirmation-prompt';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, formSchema } from './form-model'
import { FormFieldError, FormRootError } from '../errors';

export function AddNewPlaylistForm({ onNewItemAccepted }: { onNewItemAccepted: (newPlaylist: PlaylistModel) => void }) {
	const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) })
	const [newPlaylistModel, setNewPlaylistModel] = useState<PlaylistModel | null>(null)
	const currentUser = useContext(FirebaseAuthContext)
	const currentPlaylistType = form.watch("playlistType");


	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		const requestPayload: PlaylistRequestModel = {
			playlistID: data.playlistID,
			playlistType: data.playlistType,
		};
		const result = await fetchPlaylistFromAPI(requestPayload, currentUser.user)

		if (isApiError(result)) {
			form.setError('root', { message: result.message });
			return
		}

		setNewPlaylistModel({
			enabled: true,
			...result,
			uuid: uuidv4()
		})
	}


	return (
		<div className={`${centeredVariants.p80} ${borderedPadded} ${verticalMargins.v30}`}>
			<form className={flexboxVariants.gapped} onSubmit={form.handleSubmit(onSubmit)}>
				<input id="playlistID" type="text" {...form.register("playlistID")} />
				<FormFieldError error={form.formState.errors.playlistID} />

				<select {...form.register("playlistType")}>
					{Object.entries(PlaylistTypesEnum.Values).map(([key, value]) => {
						return <option key={key} value={key}>{value}</option>;
					})}
				</select>


				<button type='submit'>Search</button>
			</form>
			<div className={flexboxVariants.verticalCentered}>
				{
					form.formState.isSubmitting && <div className={spinner} />
				}
				<FormRootError error={form.formState.errors.root} />
				{
					newPlaylistModel && <ConfirmationPrompt
						Playlist={newPlaylistModel} onAcceptPlaylist={() => {
							form.reset()
							onNewItemAccepted(newPlaylistModel)
							setNewPlaylistModel(null)
						}} onRejectPlaylist={() => {
							form.reset()
							setNewPlaylistModel(null)
						}} />
				}

				{
					currentPlaylistType === 'Youtube' && <YoutubeDoc />
				}
				{
					currentPlaylistType === 'Spotify' && <SpotifyDoc />
				}

			</div>

		</div>
	);
}


