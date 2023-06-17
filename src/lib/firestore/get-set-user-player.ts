import { getFirebaseAdminConfig } from "@/firebase-admin-config";
import { applicationConstants } from "@/constants";
import { z } from "zod";
import { trackSchema } from "@/models/track-model";

export const DBPlayerModelValidator = z.object({
	playlistItems: z.array(trackSchema),
	currentIndex: z.number().gte(0)
});
export interface DBPlayerModel extends z.infer<typeof DBPlayerModelValidator> { }


export async function setUserPlayer(userID: string, playerState: DBPlayerModel) {
	await getFirebaseAdminConfig()
		.collection(applicationConstants.fireStoreConstants.playerCollection)
		.doc(userID).set(playerState, { merge: true })
}

export async function setUserPlayerIndex(userID: string, newIndex: number) {
	await getFirebaseAdminConfig()
		.collection(applicationConstants.fireStoreConstants.playerCollection)
		.doc(userID).set({currentIndex: newIndex} as DBPlayerModel, { merge: true })
}


export async function getUserPlayer(userID: string): Promise<DBPlayerModel> {
	const result = await getFirebaseAdminConfig()
		.collection(applicationConstants.fireStoreConstants.playerCollection)
		.doc(userID).get()

	if (!result.data()) {
		return {
			currentIndex: 0,
			playlistItems: []
		}
	}

	return DBPlayerModelValidator.parse(result.data())
}
