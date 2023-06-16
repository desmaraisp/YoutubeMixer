import { ApiErrorModel, ApiErrorSchema } from "@/models/api-models/api-error-response";
import { PlaylistModel } from "@/models/playlist-model";

export async function pushUserPlaylists(model: PlaylistModel[]): Promise<ApiErrorModel | null> {
	try {
		var response = await fetch('/api/user-playlists', {
			method: 'Put',
			body: JSON.stringify(model),
		});

		if (response.status == 200) {
			return null
		}

		const result = await response.json()
		return await ApiErrorSchema.parseAsync(result)
	}
	catch (e) {
		if (e instanceof Error) {
			return {
				message: e.message
			}
		}
		console.log(e)
		throw e
	}
}