import { adminDB } from "$lib/server/admin";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
	const uid = locals.userId;

	if (!uid) {
		throw redirect(301, "/login");
	}

	const userDoc = await adminDB.collection("users").doc(uid).get();
	const { username, bio } = userDoc.data()!;

	if (params.username !== username) {
		throw error(401, "That username does not belong to you");
	}

	return { bio };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		const uid = locals.userId!;

		const data = await request.formData();
		const bio = data.get("bio")?.toString() ?? "";

		if (bio.length > 260) {
			return fail(400, { problem: "Bio must be less than 260 characters" });
		}

		const userRef = adminDB.collection("users").doc(uid);
		await userRef.update({ bio });
	}
} satisfies Actions;
