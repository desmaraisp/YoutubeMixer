import { SendBodyLessRequest } from "@/lib/send-request";
import { RemotePlaylistModel, RemotePlaylistSchemaWithDetails } from "../../remote-playlist-schema";

export async function GetRemotePlaylistContents(data: RemotePlaylistModel) {
	return await SendBodyLessRequest(
		`/api/remote-playlist?remote-playlist-id=${data.remotePlaylistId}&playlist-type=${data.playlistType}`,
		"get",
		RemotePlaylistSchemaWithDetails
	);
}