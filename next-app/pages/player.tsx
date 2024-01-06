import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next/types";
import { prismaClient } from "@/globals/prisma-client";
import { Card, Group, Stack, Title } from "@mantine/core";
import { PlaylistTrackModelWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { TracksListDisplayTable } from "@/features/playlist-track/components/tracks-display/display";
import { PlayerContextProvider } from "@/features/player/components/player-context-component/player-context";
import { PlayerMenu } from "@/features/player/components/player-menu/menu";
import { PlayerMainDisplay } from "@/features/player/components/player-display/main-display";
import { createSupabaseClientForServerSideProps } from "@/lib/supabase-client-factory";
import { ErrorWithHTTPCode } from "@/exceptions/error-with-http-code";

export const getServerSideProps = async (_context: GetServerSidePropsContext) => {
	const supabase = createSupabaseClientForServerSideProps(_context)
	const user = (await supabase.auth.getSession()).data.session?.user

	if (!user) throw new ErrorWithHTTPCode('Unauthorized', 403)

	const playerResult = await prismaClient.player.findFirst({
		where: { userId: user.id },
	})
	const tracksResult = await prismaClient.playlistTrack.findMany({
		where: {
			playlist: {
				enabled: true,
				userId: user.id
			}
		},
		include: {
			playlist: {
				select: { playlistType: true }
			}
		},
		orderBy: {
			orderingKey: 'asc'
		}
	})

	return {
		props: {
			playerResult,
			tracksResult: tracksResult.map<PlaylistTrackModelWithTrackType>(x => ({
				remoteTrackId: x.remoteTrackId,
				trackId: x.playlistTrackId,
				trackName: x.itemName,
				trackType: x.playlist.playlistType
			}))
		}
	}
}


export default function Transactions({
	playerResult, tracksResult
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<PlayerContextProvider tracksList={tracksResult} currentPlayingTrackId={playerResult?.currentTrackId ?? null}>
			<Title>Player</Title>
			<Card shadow="xl">
				<Group justify="space-evenly" wrap="wrap" align="stretch">
					<div style={{ flex: 2, aspectRatio: '16/9', minWidth: '400px' }}>
						<PlayerMainDisplay />
					</div>
					<Stack style={{ flex: 1 }}>
						<PlayerMenu />
						<TracksListDisplayTable tracks={tracksResult} />
					</Stack>
				</Group>
			</Card>
		</PlayerContextProvider>
	)
}
