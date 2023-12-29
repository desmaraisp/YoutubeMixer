import { PlaylistTrackModel } from "@/features/playlist-track/playlist-track-schema";

export async function GetPlaylistData(remotePlaylistId: string, playlistType: string) {
	// if(payload.playlistType === 'Spotify') {
	// 	return getSpotifyPlaylistData(payload.remotePlaylistId, null)
	// }
	// else if(payload.playlistType === 'Youtube'){
	// 	return getYoutubePlaylistData(payload.remotePlaylistId, null)
	// }
	// else{
	// 	throw new Error("")
	// }
	return {
		playlistName: 'test',
		playlistTracks: [
			{
				remoteTrackId: 'vad1wAe5mB4',
				trackName: 'ligma',
			} as PlaylistTrackModel,
			{
				remoteTrackId: 'fNjaUw8wR2c',
				trackName: 'balls',
			} as PlaylistTrackModel
		],
	}
}