import { FirebaseOptions, getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { applicationConfig } from "./configuration";

const firebaseConfig: FirebaseOptions = {
	apiKey: applicationConfig.publicAPIKey,
	authDomain: applicationConfig.publicAuthDomain,
	projectId: applicationConfig.publicProjectID,
	storageBucket: applicationConfig.publicStorageBucket,
	messagingSenderId: applicationConfig.publicMessagingSenderId,
	appId: applicationConfig.publicAppID
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}
export const clientAuth = getAuth(getApp())
export const clientDB = getFirestore(getApp())