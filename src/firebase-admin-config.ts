import { credential, AppOptions } from "firebase-admin";
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import firebaseAdmin from 'firebase-admin'
import { applicationConfig } from "./configuration";

if (!firebaseAdmin.apps.length) {
	if(!applicationConfig.clientEmail || !applicationConfig.privateKey){
		firebaseAdmin.initializeApp()
	}
	else{
		const adminConfig: AppOptions = {
			credential: credential.cert({
				clientEmail: applicationConfig.clientEmail,
				privateKey: applicationConfig.privateKey,
				projectId: applicationConfig.publicProjectID
			})
		}
		firebaseAdmin.initializeApp(adminConfig);
	}
}
export const adminAuth = getAuth(firebaseAdmin.app())
export const adminDB = getFirestore(firebaseAdmin.app())