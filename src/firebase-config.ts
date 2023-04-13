import { FirebaseOptions, getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_ApiKey ?? (() => {throw new Error("Missing var NEXT_PUBLIC_ApiKey")})(),
	authDomain: process.env.NEXT_PUBLIC_AuthDomain ?? (() => {throw new Error("Missing var NEXT_PUBLIC_AuthDomain")})(),
	projectId: process.env.NEXT_PUBLIC_ProjectId ?? (() => {throw new Error("Missing var NEXT_PUBLIC_ProjectId")})(),
	storageBucket: process.env.NEXT_PUBLIC_StorageBucket ?? (() => {throw new Error("Missing var NEXT_PUBLIC_StorageBucket")})(),
	messagingSenderId: process.env.NEXT_PUBLIC_MessagingSenderId ?? (() => {throw new Error("Missing var NEXT_PUBLIC_MessagingSenderId")})(),
	appId: process.env.NEXT_PUBLIC_AppId ?? (() => {throw new Error("Missing var NEXT_PUBLIC_AppId")})()
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}
export const clientAuth = getAuth(getApp())
export const clientDB = getFirestore(getApp())