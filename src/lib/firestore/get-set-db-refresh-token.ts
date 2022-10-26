import { applicationConstants } from "@/constants";
import { adminDB } from "@/firebase-admin-config";
import { DBAuthorizationsModel, DBAuthorizationsModelValidator } from "@/models/database/db-authorizations-model";


export async function setRefreshTokensToDB(userID: string, refreshTokensModel: DBAuthorizationsModel){
	await adminDB
			.collection(applicationConstants.fireStoreConstants.authorizationsCollection)
			.doc(userID).set(refreshTokensModel, {merge: true})
}
export async function getRefreshTokensFromDB(userID: string): Promise<DBAuthorizationsModel> {
	const result = await adminDB
			.collection(applicationConstants.fireStoreConstants.authorizationsCollection)
			.doc(userID).get()

	if(!result.data()){
		return {}
	}

	return DBAuthorizationsModelValidator.parse(result.data())
}