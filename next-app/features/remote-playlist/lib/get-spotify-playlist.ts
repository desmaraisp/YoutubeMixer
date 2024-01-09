import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { PlaylistTrackModel } from '@/features/playlist-track/playlist-track-schema';


export async function getSpotifyPlaylistData(PlaylistID: string): Promise<{ playlistName: string; playlistTracks: PlaylistTrackModel[]; }> {
	const spotifyApi = SpotifyApi.withClientCredentials(
		process.env.SPOTIFY_CLIENT_ID!,
		process.env.SPOTIFY_CLIENT_SECRET!,
		[]
	);
	const playlistData = await spotifyApi.playlists.getPlaylist(PlaylistID)

	while (playlistData.tracks.next) {
		const nextPage = await spotifyApi.playlists.getPlaylistItems(
			PlaylistID,
			undefined,
			undefined,
			50,
			playlistData.tracks.offset + playlistData.tracks.items.length,
			undefined
		)
			
		playlistData.tracks.items = [...playlistData.tracks.items, ...nextPage.items]
		playlistData.tracks.next = nextPage.next
		playlistData.tracks.offset = nextPage.offset
	}


	const playlistItems = playlistData.tracks.items.flatMap((item) => {
		if (!item.track) return []

		const playlistItemResult: PlaylistTrackModel = {
			remoteTrackId: item.track.id,
			trackName: item.track.name,
		};
		return playlistItemResult
	})

	return {
		playlistTracks: playlistItems,
		playlistName: playlistData.name,
	}
}