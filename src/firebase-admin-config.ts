import { getFirestore } from 'firebase-admin/firestore'
import firebaseAdmin from 'firebase-admin'

export function getFirebaseAdminConfig() {

	if (!firebaseAdmin.apps.length) {
		firebaseAdmin.initializeApp();
	}
	return getFirestore()
}