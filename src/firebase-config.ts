import { FirebaseOptions, getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { publicConfiguration } from "./configuration";

const firebaseConfig: FirebaseOptions = {
	apiKey: publicConfiguration.firebaseApiKey,
	authDomain: publicConfiguration.firebaseAuthDomain,
	projectId: publicConfiguration.projectID,
	storageBucket: publicConfiguration.firebaseStorageBucket,
	messagingSenderId: publicConfiguration.firebaseMessagingSenderId,
	appId: publicConfiguration.firebaseAppID
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}
export const clientAuth = getAuth(getApp())
export const clientDB = getFirestore(getApp())