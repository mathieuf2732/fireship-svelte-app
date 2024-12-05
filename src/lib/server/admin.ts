import { getAuth } from "firebase-admin/auth";
import { FIREBASE_SERVICE_ACCOUNT } from "$env/static/private";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

try {
	admin.initializeApp({
		credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT)
	});
} catch (e: unknown) {
	if (e instanceof Error && !/already exists/.test(e.message)) {
		console.error("Firebase Admin Error: ", e.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
