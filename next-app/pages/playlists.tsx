import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";
import { prismaClient } from "@/globals/prisma-client";
import { Stack, Title } from "@mantine/core";
import { PlaylistModelWithId } from "@/features/playlist/playlist-schema";
import { PlaylistsDisplayTable } from "@/features/playlist/components/display-component/display";
import { AcceptPlaylistImportForm } from "@/features/playlist/components/accept-component/form";
import { RemotePlaylistForm } from "@/features/remote-playlist/components/import-component/form";
import { useState } from "react";
import { RemotePlaylistModel, RemotePlaylistModelWithDetails } from "@/features/remote-playlist/remote-playlist-schema";

export const getServerSideProps = async (_context: GetServerSidePropsContext) => {
	const result = await prismaClient.playlist.findMany({
		include: {
			playlistItems: true
		}
	})

	return {
		props: {
			playlists: result.map<PlaylistModelWithId>(x => ({
				playlistId: x.playlistId,
				enabled: x.enabled,
				playlistName: x.playlistName,
				playlistItems: x.playlistItems.map(y => ({
					remoteTrackId: y.remoteTrackId,
					trackName: y.itemName,
					trackId: y.playlistTrackId,
					trackType: x.playlistType
				})),
				playlistType: x.playlistType,
				remotePlaylistId: x.remotePlaylistId
			}))
		}
	}
}


export default function Transactions({
	playlists
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [remotePlaylistData, setRemotePlaylistData] = useState<RemotePlaylistModelWithDetails | null>(null)

	return (
		<>
			<Title>Playlists</Title>
			<Stack>
				<PlaylistsDisplayTable playlists={playlists} />
				{
					!remotePlaylistData && <RemotePlaylistForm onRemotePlaylistDataReceived={setRemotePlaylistData} />
				}
				{
					remotePlaylistData && <AcceptPlaylistImportForm remotePlaylistData={ remotePlaylistData } onCompletedCallback={() => setRemotePlaylistData(null)} />
				}
			</Stack>
		</>
	)
}
