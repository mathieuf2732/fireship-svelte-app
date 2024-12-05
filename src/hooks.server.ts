import { adminAuth } from "$lib/server/admin";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get("__session");

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
		event.locals.userId = decodedClaims.uid;
	} catch {
		event.locals.userId = null;
		resolve(event);
	}

	return resolve(event);
}) satisfies Handle;
