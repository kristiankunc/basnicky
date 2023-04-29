import type { RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";
import { AlbumDB } from "$lib/database/album";
import { PoemDB } from "$lib/database/poem";

export const POST = (async ({ request, cookies }) => {
    let password = cookies.get("password")

    if (password !== masterPassword) {
        return new Response(null, {
            status: 403,
            headers: {
                "Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
            },
        });
    }
    
    let body = await request.json();

    if (!body.name || !(body.name.length > 0 && body.name.length < 256)) {
        throw new Error("Invalid album name");
    }
    if (!body.author || !(body.author.length > 0 && body.author.length < 256)) {
        throw new Error("Invalid author image");
    }
    if (!body.albumId) {
        throw new Error("Invalid album id");
    }
    if (!body.text ) {
        throw new Error("Invalid text");
    }

    PoemDB.addPoem(body.name, body.author, body.text, body.albumId, body.explicit ? 1 : 0);

    return new Response(null, {
        status: 200,
    });


}) satisfies RequestHandler;

export const DELETE = (async ({ request, cookies }) => {
    let password = cookies.get("password")

    if (password !== masterPassword) {
        return new Response(null, {
            status: 403,
            headers: {
                "Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
            },
        });
    }
    
    let body = await request.json();

    if (!body.poemId) {
        throw new Error("Invalid poem id");
    }

    PoemDB.deletePoem(body.poemId);

    return new Response(null, {
        status: 200,
    });
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
    let password = cookies.get("password")

    if (password !== masterPassword) {
        return new Response(null, {
            status: 403,
            headers: {
                "Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
            },
        });
    }
    
    let body = await request.json();

    if (!body.poemId) {
        throw new Error("Invalid poem id");
    }
    if (!body.name || !(body.name.length > 0 && body.name.length < 256)) {
        throw new Error("Invalid poem name");
    }
    if (!body.author || !(body.author.length > 0 && body.author.length < 256)) {
        throw new Error("Invalid author image");
    }
    if (!body.albumId) {
        throw new Error("Invalid album id");
    }
    if (!body.text ) {
        throw new Error("Invalid text");
    }

    console.log(body)
    
    PoemDB.updatePoem(body.poemId, body.name, body.author, body.text, body.albumId, body.explicit ? 1 : 0);

    return new Response(null, {
        status: 200,
    });


}) satisfies RequestHandler;