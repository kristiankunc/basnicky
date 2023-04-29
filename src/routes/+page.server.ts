import { AlbumDB } from "$lib/database/album"

export const load = async () => {
    let albums = await AlbumDB.getAlbums();

    return {
        albums: albums
    }
}