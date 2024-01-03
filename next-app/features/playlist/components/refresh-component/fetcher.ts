import { SendJsonRequest } from "@/lib/send-request";
import { PlaylistModelWithId } from "../../playlist-schema";

export async function UpdatePlaylist(data: PlaylistModelWithId) {
	return await SendJsonRequest(
		data,
		`/api/playlists/${data.playlistId}`,
		"put"
	);
}