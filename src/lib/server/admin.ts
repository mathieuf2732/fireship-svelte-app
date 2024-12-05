import { getAuth } from "firebase-admin/auth";
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from "$env/static/private";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

try {
	admin.initializeApp({
		credential: admin.credential.cert({
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY,
			projectId: FB_PROJECT_ID
		})
	});
} catch (e: unknown) {
	if (e instanceof Error && !/already exists/.test(e.message)) {
		console.error("Firebase Admin Error: ", e.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
