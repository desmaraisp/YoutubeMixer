import { SendJsonRequest } from "@/lib/send-request";
import { PlaylistTrackModelForPatch } from "../../playlist-track-schema";

export async function PatchPlaylistItems(data: PlaylistTrackModelForPatch[]) {
	return await SendJsonRequest(
		data,
		"/api/playlist-items",
		"PATCH"
	);
}