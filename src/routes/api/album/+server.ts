import type { RequestHandler } from "@sveltejs/kit";
import { masterPassword } from "$lib/config";
import { AlbumDB } from "$lib/database/album";

export const POST = (async ({ request, cookies }) => {
	let password = cookies.get("password");

	if (password !== masterPassword) {
		return new Response(null, {
			status: 403,
			headers: {
				"Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
			}
		});
	}

	let body = await request.json();

	if (!body.name || !(body.name.length > 0 && body.name.length < 256)) {
		throw new Error("Invalid album name");
	}
	if (!body.image || !(body.image.length > 0 && body.image.length < 512)) {
		throw new Error("Invalid album image");
	}

	AlbumDB.createAlbum(body.name, body.image);

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;

export const DELETE = (async ({ request, cookies }) => {
	let password = cookies.get("password");

	if (password !== masterPassword) {
		return new Response(null, {
			status: 403,
			headers: {
				"Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
			}
		});
	}

	let body = await request.json();

	if (!body.albumId) {
		throw new Error("Invalid album id");
	}

	AlbumDB.deleteAlbum(body.albumId);

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
	let password = cookies.get("password");

	if (password !== masterPassword) {
		return new Response(null, {
			status: 403,
			headers: {
				"Set-Cookie": `password=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
			}
		});
	}

	let body = await request.json();

	if (!body.albumId) {
		throw new Error("Invalid album id");
	}

	if (!body.name || !(body.name.length > 0 && body.name.length < 256)) {
		throw new Error("Invalid album name");
	}
	if (!body.image || !(body.image.length > 0 && body.image.length < 512)) {
		throw new Error("Invalid album image");
	}

	AlbumDB.updateAlbum(body.albumId, body.name, body.image);

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;
