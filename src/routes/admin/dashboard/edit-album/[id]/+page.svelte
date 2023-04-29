<script lang="ts">
	import "$lib/styles/global.css";
	import "$lib/styles/edit.css";
	import type { Album } from "$lib/types";
	import { goto } from "$app/navigation";

	export let data: Album;

	let inputAlbum: Album = {
		id: data.id,
		name: data.name,
		image: data.image
	};

	export async function updateAlbum(album: Album) {
		if (!album.id) {
			throw new Error("Invalid album id");
		}

		if (!album.name || !(album.name.length > 0 && album.name.length < 256)) {
			alert("Jmeno blbe");
		}

		if (!album.image) {
			throw new Error("image blbe");
		}

		const res = await fetch(`/api/album`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				albumId: album.id,
				name: album.name,
				image: album.image
			})
		});

		if (res.status === 200) {
			alert("Album upraveno");
			goto("/admin/dashboard");
		} else {
			alert(`Neco se pokazilo\n${res.status} ${await res.text()}`);
		}
	}
</script>

<form>
	<p>{data.id}</p>
	<input type="text" placeholder="Název" bind:value={inputAlbum.name} />
	<br />
	<input type="text" placeholder="Obrázek" bind:value={inputAlbum.image} />
	<br />
	<button on:click={() => updateAlbum(inputAlbum)}>Upravit</button>
</form>
