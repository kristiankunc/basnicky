import { redirect, type RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";

export const GET = (async ({ cookies }) => {
	let password = cookies.get("password");

	if (password === masterPassword) {
		redirect(302, "/admin/dashboard");
	}

	redirect(302, "/admin/login");
}) satisfies RequestHandler;
