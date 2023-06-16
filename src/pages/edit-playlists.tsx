import React from 'react'
import { PlaylistsEdit } from '../components/playlists-edit'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { PlaylistsModel } from '@/models/playlists-model'
import { UserPlaylistsContextProvider } from '@/contexts/user-playlists-context'

export const getServerSideProps: GetServerSideProps<{ initialUserPlaylists: PlaylistsModel }> = async (context) => {
	// const session = await getServerSession()

	return {
		props: {
			initialUserPlaylists: {
				playlists: []
			}
		}
	}
}


export default function EditPlaylists({
	initialUserPlaylists,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<UserPlaylistsContextProvider serverSideUserPlaylists={initialUserPlaylists}>
			<PlaylistsEdit />
		</UserPlaylistsContextProvider>
	)
}
