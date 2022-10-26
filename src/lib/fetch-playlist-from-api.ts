import { PlaylistRequestModel, PlaylistResponseModel, PlaylistResponseSchema } from "@/models/api-models/playlist-api-models";
import { getIdToken, User } from "firebase/auth";


export async function fetchPlaylistFromAPI(model: PlaylistRequestModel, user: User | null): Promise<PlaylistResponseModel> {
	const headers: HeadersInit | undefined = user ? { Authorization: await getIdToken(user) } : undefined

	try {
		var response = await fetch('/api/get-playlist-contents', {
			method: 'Post',
			body: JSON.stringify(model),
			headers
		});
	}
	catch (e) {
		if(e instanceof Error){
			return {
				message: e.message
			}
		}
		console.log(e)
		throw e
	}

	const result = await response.json()
	return await PlaylistResponseSchema.parseAsync(result)
}