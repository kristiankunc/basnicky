import type { Album, Poem } from "$lib/types";

export async function createAlbum(album: Album) {
    if (!album.name || !album.image) {
        alert("Chybí název nebo obrázek!");
        return;
    }

    if (album.name.length > 256 || album.image.length > 512) {
        alert("Název nebo obrázek je příliš dlouhý!");
        return;
    }

    const res = await fetch("/api/album", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: album.name,
            image: album.image
        })
    });

    if (res.status === 200) {
        alert("Album vytvořeno!");
        location.reload();
    } else {
        alert(`Něco se pokazilo!\nStatus: ${res.status}\n${await res.text()}`);
    }
}

export async function addPoem(poem: Poem) {
    if (!poem.name || !poem.author || !poem.text || !poem.albumId) {
        alert("Chybí název, autor, text nebo album ID!");
        return;
    }

    if (poem.name.length > 256 || poem.author.length > 256 || poem.text.length > 1024) {
        alert("Název, autor nebo text je příliš dlouhý!");
        return;
    }

    const res = await fetch("/api/poem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: poem.name,
            author: poem.author,
            text: poem.text,
            albumId: poem.albumId,
            explicit: poem.explicit ? 1 : 0
        })
    });

    if (res.status === 200) {
        alert("Báseň přidána!");
        location.reload();
    } else {
        alert(`Něco se pokazilo!\nStatus: ${res.status}\n${await res.text()}`);
    }
}