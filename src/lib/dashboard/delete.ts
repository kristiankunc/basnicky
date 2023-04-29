import type { Album, Poem } from "$lib/types";

export async function deleteAlbum(album: Album) {
    console.log(album)
    const res = await fetch("/api/album", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            albumId: album.id
        })
    });

    if (res.status === 200) {
        alert("Album smazáno!");
        location.reload();
    } else {
        alert(`Něco se pokazilo!\nStatus: ${res.status}\n${await res.text()}`);
    }
}

export async function deletePoem(poem: Poem) {
    const res = await fetch("/api/poem", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            poemId: poem.id
        })
    });

    if (res.status === 200) {
        alert("Báseň smazána!");
        location.reload();
    } else {
        alert(`Něco se pokazilo!\nStatus: ${res.status}\n${await res.text()}`);
    }
}