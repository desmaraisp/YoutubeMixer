import { PlaylistItem } from '@/models/playlist-item'
import { PlaylistSuccessResponseModel } from "@/models/api-models/playlist-api-models";
import { PlaylistTypesEnum } from '@/models/playlist-types'
import { youtube } from '@googleapis/youtube'
import { v4 as uuidv4 } from 'uuid';
import { UserRefreshClient } from 'googleapis-common';
import { ErrorWithHTTPCode } from '@/models/exceptions/custom-exceptions';
import { getPrivateConfiguration } from '@/configuration';

function clientFactory(refreshToken: string | null) {
	if (!refreshToken)
		return youtube({
			version: 'v3',
			auth: getPrivateConfiguration().youtubeApiKey
		})

	return youtube({
		version: 'v3',
	})
}


export async function getYoutubePlaylistData(PlaylistID: string, refreshToken: string | null): Promise<PlaylistSuccessResponseModel> {
	const client = clientFactory(refreshToken)
	const oauth = refreshToken ? new UserRefreshClient(
		getPrivateConfiguration().googleClientID,
		getPrivateConfiguration().googleClientSecret,
		refreshToken,
	) : undefined

	const [playlistItemsResult, playlistResult] = await Promise.all([
		client.playlistItems.list({
			auth: oauth,
			part: ["snippet"],
			playlistId: PlaylistID,
			maxResults: 50
		}),
		client.playlists.list({
			auth: oauth,
			id: [PlaylistID],
			part: ["snippet"]
		})
	]);

	while (playlistItemsResult.data.nextPageToken) {
		const nextPage = await client.playlistItems.list({
			part: ["snippet"],
			auth: oauth,
			playlistId: PlaylistID,
			maxResults: 50,
			pageToken: playlistItemsResult.data.nextPageToken
		})

		playlistItemsResult.data.items = [...(playlistItemsResult.data.items ?? []), ...(nextPage.data.items ?? [])]

		playlistItemsResult.data.nextPageToken = nextPage.data.nextPageToken
	}

	if (!playlistItemsResult.data.items || !playlistResult.data.items) throw new ErrorWithHTTPCode("No items found", 404)

	const playlistItems = playlistItemsResult.data.items.map((item) => {
		const playlistItemResult: PlaylistItem = {
			itemImageURL: item.snippet?.thumbnails?.high?.url!,
			itemName: item.snippet?.title!,
			itemID: item.snippet?.resourceId?.videoId!,
			type: PlaylistTypesEnum.Enum.Youtube,
			uuid: uuidv4()
		};
		return playlistItemResult
	}).filter(item => item.itemName !== "Deleted video")

	return {
		playlistID: PlaylistID,
		playlistItems: playlistItems,
		playlistName: playlistResult.data.items[0].snippet?.title!,
		playlistType: 'Youtube',
		playlistURL: `https://www.youtube.com/playlist?list=${PlaylistID}`,
		playlistImage: playlistResult.data.items[0].snippet?.thumbnails?.high?.url!
	}
}