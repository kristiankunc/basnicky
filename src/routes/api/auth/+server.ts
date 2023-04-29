import { type RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";

export const POST = (async ({ request }) => {
    let password = request.headers.get("Authorization");

    if (password == masterPassword) {
            return new Response(null, {
            status: 200,
            headers: {
                "Set-Cookie": `password=${password}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
            }
        });
    }

    else return new Response(null, {
        status: 403,
        headers: {
            "Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
        }
    });


}) satisfies RequestHandler;