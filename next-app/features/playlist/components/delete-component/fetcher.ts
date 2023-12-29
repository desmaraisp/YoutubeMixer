import { SendBodyLessRequest } from "@/lib/send-request";
import { ApiErrorResponseModel } from "@/lib/api-error-response"
import { z } from "zod";

export async function DeletePlaylist(playlistId: string): Promise<ApiErrorResponseModel | null> {
	return SendBodyLessRequest(`/api/playlists/${playlistId}`, 'Delete', z.null());
}