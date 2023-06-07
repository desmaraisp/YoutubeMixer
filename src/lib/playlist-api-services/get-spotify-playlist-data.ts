import { PlaylistItem } from '@/models/playlist-item'
import { PlaylistSuccessResponseModel } from "@/models/api-models/playlist-api-models";
import { PlaylistTypesEnum } from '@/models/playlist-types'
import { v4 as uuidv4 } from 'uuid';
import SpotifyWebApi from 'spotify-web-api-node'
import { privateConfiguration } from '@/configuration';

const spotifyApi = new SpotifyWebApi({
	clientId: privateConfiguration.spotifyClientID,
	clientSecret: privateConfiguration.spotifyClientSecret
});

export async function getSpotifyPlaylistData(PlaylistID: string, refreshToken: string | null): Promise<PlaylistSuccessResponseModel> {
	if(!refreshToken){
		const response = await spotifyApi.clientCredentialsGrant()
		spotifyApi.setAccessToken(response.body.access_token)
	}
	else{
		spotifyApi.setRefreshToken(refreshToken)
		const response = await spotifyApi.refreshAccessToken()
		spotifyApi.setAccessToken(response.body.access_token)	
	}

	const playlistData = await spotifyApi.getPlaylist(PlaylistID)

	while (playlistData.body.tracks.next) {
		const nextPage = await spotifyApi.getPlaylistTracks(PlaylistID, {
			offset: playlistData.body.tracks.offset+ 100,
			limit: 100
		})

		playlistData.body.tracks.items = [...playlistData.body.tracks.items, ...nextPage.body.items]
		playlistData.body.tracks.next = nextPage.body.next
		playlistData.body.tracks.offset = nextPage.body.offset
	}


	const playlistItems = playlistData.body.tracks.items.flatMap((item) => {
		if(!item.track) return []

		const playlistItemResult: PlaylistItem = {
			itemImageURL: item.track.album.images[0].url,
			itemName: item.track.name,
			itemID: item.track.uri,
			type: PlaylistTypesEnum.Enum.Spotify,
			uuid: uuidv4()
		};
		return playlistItemResult
	})

	return {
		playlistID: PlaylistID,
		playlistItems: playlistItems,
		playlistName: playlistData.body.name,
		playlistType: 'Spotify',
		playlistURL: playlistData.body.external_urls.spotify,
		playlistImage: playlistData.body.images[0].url
	}
}