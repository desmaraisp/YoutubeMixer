import React from 'react'
import { PlaylistsEdit } from '../components/playlists-edit'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { PlaylistsModel } from '@/models/playlists-model'
import { UserPlaylistsContextProvider } from '@/contexts/user-playlists-context'
import { getServerSession } from 'next-auth'
import { getUserPlaylists } from '@/lib/firestore/get-set-user-playlists'
import { getAuthOptions } from '@/auth-options'

export const getServerSideProps: GetServerSideProps<{ initialUserPlaylists: PlaylistsModel }> = async (context) => {
	const session = await getServerSession(context.req, context.res, getAuthOptions())
	if (!session?.user?.id) {
		return {
			props: {
				initialUserPlaylists: {
					playlists: []
				}
			}
		}
	}

	const userPlaylists = await getUserPlaylists(session?.user?.id)
	return {
		props: {
			initialUserPlaylists: {
				playlists: userPlaylists.playlists
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
