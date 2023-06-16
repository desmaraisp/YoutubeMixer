import { applicationConstants } from "@/constants";
import { getFirebaseAdminConfig } from "@/firebase-admin-config";
import { z } from "zod";

export const DBAuthorizationsModelValidator = z.object({
	googleRefreshToken: z.optional(z.string()),
	spotifyRefreshToken: z.optional(z.string())
});
export interface DBAuthorizationsModel extends z.infer<typeof DBAuthorizationsModelValidator> { }


export async function setRefreshTokensToDB(userID: string, refreshTokensModel: DBAuthorizationsModel){
	await getFirebaseAdminConfig()
			.collection(applicationConstants.fireStoreConstants.authorizationsCollection)
			.doc(userID).set(refreshTokensModel, {merge: true})
}
export async function getRefreshTokensFromDB(userID: string): Promise<DBAuthorizationsModel> {
	const result = await getFirebaseAdminConfig()
			.collection(applicationConstants.fireStoreConstants.authorizationsCollection)
			.doc(userID).get()

	if(!result.data()){
		return {}
	}

	return DBAuthorizationsModelValidator.parse(result.data())
}