import { credential, AppOptions } from "firebase-admin";
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import firebaseAdmin from 'firebase-admin'
import { getPrivateConfiguration, getPublicConfiguration } from "./configuration";

export function getFirebaseAdminConfig() {

	if (!firebaseAdmin.apps.length) {
		const privateConfiguration = getPrivateConfiguration()

		if (!privateConfiguration.firebaseClientEmail || !privateConfiguration.firebasePrivateKey) {
			firebaseAdmin.initializeApp()
		}
		else {
			const adminConfig: AppOptions = {
				credential: credential.cert({
					clientEmail: privateConfiguration.firebaseClientEmail,
					privateKey: privateConfiguration.firebasePrivateKey,
					projectId: getPublicConfiguration().projectID
				})
			}
			firebaseAdmin.initializeApp(adminConfig);
		}
	}
	const adminAuth = getAuth(firebaseAdmin.app())
	const adminDB = getFirestore(firebaseAdmin.app())
	return { adminAuth, adminDB }
}