import { adminAuth, adminDB } from "$lib/server/admin";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const sessionCookie = cookies.get("__session");

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
		const userDoc = await adminDB.collection("users").doc(decodedClaims.uid).get();
		const userData = userDoc.data();

		return {
			bio: userData?.bio
		};
	} catch (e) {
		console.error(e);
		throw error(401, "Unauthorized request!");
	}
}) satisfies PageServerLoad;
