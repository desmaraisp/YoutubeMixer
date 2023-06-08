import { FirebaseOptions, getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getPublicConfiguration } from "./configuration";


export function getFirebaseConfig() {
	if (!getApps().length) {
		const publicConfiguration = getPublicConfiguration()

		const firebaseConfig: FirebaseOptions = {
			apiKey: publicConfiguration.firebaseApiKey,
			authDomain: publicConfiguration.firebaseAuthDomain,
			projectId: publicConfiguration.projectID,
			storageBucket: publicConfiguration.firebaseStorageBucket,
			messagingSenderId: publicConfiguration.firebaseMessagingSenderId,
			appId: publicConfiguration.firebaseAppID
		};

		initializeApp(firebaseConfig);
	}
	const clientAuth = getAuth(getApp())
	const clientDB = getFirestore(getApp())

	return { clientAuth, clientDB }
}