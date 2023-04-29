import { redirect, type RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";

export const GET = (async ({ cookies }) => {
    let password = cookies.get("password");

    if (password === masterPassword) {
        throw redirect(302, "/admin/dashboard");
    }

    throw redirect(302, "/admin/login");
        


}) satisfies RequestHandler;