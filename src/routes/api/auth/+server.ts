import type { RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";

let requestCache = new Map<string, number>();

export const POST = (async ({ request }) => {
	// get the user ip
	let ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || request.headers.get("X-Real-IP") || "0";

	requestCache.set(ip, (requestCache.get(ip) || 0) + 1);
	let retries = requestCache.get(ip) || 0;

	if (retries > 5) {
		setTimeout(() => requestCache.delete(ip), 60000);

		return new Response(null, {
			status: 429,
		});
	}

	let password = request.headers.get("Authorization");

	if (password == masterPassword) {
		requestCache.delete(ip);
		return new Response(null, {
			status: 200,
			headers: {
				"Set-Cookie": `password=${password}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
			}
		});
	} else
		return new Response(null, {
			status: 403,
			headers: {
				"Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
			}
		});
}) satisfies RequestHandler;
