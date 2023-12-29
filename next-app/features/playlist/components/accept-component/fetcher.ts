import { SendJsonRequest } from "@/lib/send-request";
import { PlaylistModel } from "../../playlist-schema";

export async function PostNewPlaylist(data: PlaylistModel) {
	return await SendJsonRequest(
		data,
		"/api/playlist",
		"post"
	);
}