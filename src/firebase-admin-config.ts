import { credential, AppOptions } from "firebase-admin";
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import firebaseAdmin from 'firebase-admin'
import { privateConfiguration, publicConfiguration } from "./configuration";

if (!firebaseAdmin.apps.length) {
	if(!privateConfiguration.firebaseClientEmail || !privateConfiguration.firebasePrivateKey){
		firebaseAdmin.initializeApp()
	}
	else{
		const adminConfig: AppOptions = {
			credential: credential.cert({
				clientEmail: privateConfiguration.firebaseClientEmail,
				privateKey: privateConfiguration.firebasePrivateKey,
				projectId: publicConfiguration.projectID
			})
		}
		firebaseAdmin.initializeApp(adminConfig);
	}
}
export const adminAuth = getAuth(firebaseAdmin.app())
export const adminDB = getFirestore(firebaseAdmin.app())