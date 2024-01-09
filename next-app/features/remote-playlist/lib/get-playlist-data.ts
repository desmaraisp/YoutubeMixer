import { PlaylistTrackModel } from "@/features/playlist-track/playlist-track-schema";
import { getSpotifyPlaylistData } from "./get-spotify-playlist";
import { getYoutubePlaylistData } from "./get-youtube-playlist";

export async function GetPlaylistData(remotePlaylistId: string, playlistType: string): Promise<{ playlistName: string; playlistTracks: PlaylistTrackModel[]; }> {
	if(playlistType === 'Spotify') {
		return getSpotifyPlaylistData(remotePlaylistId)
	}
	else if(playlistType === 'Youtube'){
		return getYoutubePlaylistData(remotePlaylistId)
	}
	else{
		throw new Error(`${remotePlaylistId} isn't supported`)
	}
}