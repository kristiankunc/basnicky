import { Auth } from "$lib/auth.js";
import { masterPassword } from "$lib/config.js";
import { AlbumDB } from "$lib/database/album.js";
import { PoemDB } from "$lib/database/poem.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
	let password = cookies.get("password");

	if (!password || password !== masterPassword) {
		throw redirect(302, "/admin/login");
	}

	let albums = await AlbumDB.getAlbums();
	let poems = await PoemDB.getPoems();

	return {
		albums: albums,
		poems: poems
	};
};
