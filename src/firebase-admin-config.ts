import { credential, AppOptions } from "firebase-admin";
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import firebaseAdmin from 'firebase-admin'


const adminConfig: AppOptions = {
	credential: credential.cert({
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? (() => {throw new Error("Missing var FIREBASE_CLIENT_EMAIL")})(),
		privateKey: process.env.FIREBASE_PRIVATE_KEY ?? (() => {throw new Error("Missing var FIREBASE_PRIVATE_KEY")})(),
		projectId: process.env.FIREBASE_PROJECT_ID ?? (() => {throw new Error("Missing var FIREBASE_PROJECT_ID")})()
	})
}


if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp(adminConfig);
}
export const adminAuth = getAuth(firebaseAdmin.app())
export const adminDB = getFirestore(firebaseAdmin.app())