import { ErrorWithHTTPCode } from "@/exceptions/error-with-http-code";
import { PlaylistTrackModel } from "@/features/playlist-track/playlist-track-schema";
import { youtube } from '@googleapis/youtube'

export async function getYoutubePlaylistData(PlaylistID: string): Promise<{ playlistName: string; playlistTracks: PlaylistTrackModel[]; }> {
	const client = youtube({
		version: 'v3',
		auth: process.env.YOUTUBE_API_KEY!
	})

	const [playlistItemsResult, playlistResult] = await Promise.all([
		client.playlistItems.list({
			part: ["snippet"],
			playlistId: PlaylistID,
			maxResults: 50
		}),
		client.playlists.list({
			id: [PlaylistID],
			part: ["snippet"]
		})
	]);

	while (playlistItemsResult.data.nextPageToken) {
		const nextPage = await client.playlistItems.list({
			part: ["snippet"],
			playlistId: PlaylistID,
			maxResults: 50,
			pageToken: playlistItemsResult.data.nextPageToken
		})

		playlistItemsResult.data.items = [...(playlistItemsResult.data.items ?? []), ...(nextPage.data.items ?? [])]

		playlistItemsResult.data.nextPageToken = nextPage.data.nextPageToken
	}

	if (!playlistItemsResult.data.items || !playlistResult.data.items) throw new ErrorWithHTTPCode("No items found", 404)

	const playlistItems = playlistItemsResult.data.items.map((item) => {
		const playlistItemResult: PlaylistTrackModel = {
			trackName: item.snippet?.title!,
			remoteTrackId: item.snippet?.resourceId?.videoId!,
		};
		return playlistItemResult
	}).filter(item => item.trackName !== "Deleted video")

	return {
		playlistTracks: playlistItems,
		playlistName: playlistResult.data.items[0].snippet?.title ?? "",
	}
}