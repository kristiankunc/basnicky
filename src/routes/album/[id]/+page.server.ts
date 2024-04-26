import { AlbumDB } from "$lib/database/album";
import { PoemDB } from "$lib/database/poem.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
	let album = await AlbumDB.getAlbum(params.id);

	if (!album) {
		error(404, "Album not found");
	}

	let poems = PoemDB.getPoemsAlbum(params.id);

	return {
		album: album,
		poems: poems
	};
};
