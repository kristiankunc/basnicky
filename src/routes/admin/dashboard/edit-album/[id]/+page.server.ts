import { AlbumDB } from '$lib/database/album.js';

export const load = async ({ params }) => {
    const album = await AlbumDB.getAlbum(params.id);

    return album
}