import { applicationConstants } from "@/constants";
import { getFirebaseAdminConfig } from "@/firebase-admin-config";
import { PlaylistModelValidator as PlaylistModelSchema } from "@/models/playlist-model";
import { z } from "zod";

export const DBPlaylistsModelSchema = z.object({
	playlists: z.array(PlaylistModelSchema),
})
export interface DBPlaylistsModel extends z.infer<typeof DBPlaylistsModelSchema> { }


export async function setUserPlaylists(userID: string, playlists: DBPlaylistsModel) {
	await getFirebaseAdminConfig()
		.collection(applicationConstants.fireStoreConstants.playlistsCollection)
		.doc(userID).set(playlists, { merge: true })
}
export async function getUserPlaylists(userID: string): Promise<DBPlaylistsModel> {
	const result = await getFirebaseAdminConfig()
		.collection(applicationConstants.fireStoreConstants.playlistsCollection)
		.doc(userID).get()

	if (!result.data()) {
		return {
			playlists: []
		}
	}

	return DBPlaylistsModelSchema.parse(result.data())
}
