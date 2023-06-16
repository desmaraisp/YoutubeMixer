import { ApiErrorModel, ApiErrorSchema } from "@/models/api-models/api-error-response";
import { PlaylistContentsRequestModel, PlaylistContentsResponseModel, PlaylistContentsResponseSchema } from "@/models/api-models/playlist-contents";
import { z } from "zod";

export async function fetchPlaylistContentsFromAPI(model: PlaylistContentsRequestModel): Promise<PlaylistContentsResponseModel|ApiErrorModel> {
	try {
		var response = await fetch('/api/playlist-contents', {
			method: 'Post',
			body: JSON.stringify(model),
		});

		const result = await response.json()
		return await z.union([ApiErrorSchema, PlaylistContentsResponseSchema]).parseAsync(result)
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
}