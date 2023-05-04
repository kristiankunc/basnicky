<script lang="ts">
	import "$lib/styles/global.css";
	import "$lib/styles/dashboard.css";
	import { createAlbum, addPoem } from "$lib/dashboard/add";
	import type { Album, Poem } from "$lib/types";
	import { deleteAlbum, deletePoem } from "$lib/dashboard/delete";
	import { goto } from "$app/navigation";

	let inputAlbum: Album = {
		id: "",
		name: "",
		image: ""
	};

	let inputPoem: Poem = {
		id: "",
		name: "",
		author: "",
		text: "",
		albumId: "",
		explicit: false,
		weight: 0
	};

	export let data: {
		albums: Album[];
		poems: Poem[];
	};

	function redirectPoem(poem: Poem) {
		goto(`/admin/dashboard/edit-poem/${poem.id}`);
	}

	function redirectAlbum(album: Album) {
		goto(`/admin/dashboard/edit-album/${album.id}`);
	}
</script>

<div class="header">
	<h1>Basničky admin 😎</h1>
</div>

<div class="sections-container">
	<div class="section">
		<h2>Vytvořit album</h2>
		<input placeholder="Název" bind:value={inputAlbum.name} />
		<br />
		<input placeholder="Obrázek (url(imgur))" bind:value={inputAlbum.image} />
		<br />
		<input type="button" value="Vytvořit" on:click={() => createAlbum(inputAlbum)} />
	</div>

	<div class="section">
		<h2>Přidat báseň</h2>
		<input placeholder="Název" bind:value={inputPoem.name} />
		<br />
		<input placeholder="Autor" bind:value={inputPoem.author} />
		<br />
		<textarea placeholder="Text" bind:value={inputPoem.text} />
		<br />
		<input placeholder="Album ID" bind:value={inputPoem.albumId} />
		<p>Explicitní?!</p>
		<input type="checkbox" bind:checked={inputPoem.explicit} />
		<br />
		<input type="number" placeholder="Váha" bind:value={inputPoem.weight} />
		<br />
		<input type="button" value="Přidat" on:click={() => addPoem(inputPoem)} />
	</div>

	<div class="section">
		<h2>Editovat alba</h2>
		{#each data.albums as album}
			<div class="album">
				<h3>{album.id}</h3>
				<p>{album.name}</p>
				<p>{album.image}</p>
				<input type="button" value="Zobrazit" on:click={() => goto(`/album/${album.id}`)} />
				<input type="button" value="Editovat" on:click={() => redirectAlbum(album)} />
				<input type="button" value="Smazat" on:click={() => deleteAlbum(album)} />
			</div>
		{/each}
	</div>

	<div class="section">
		<h2>Editovat básně</h2>
		{#each data.poems as poem}
			<div class="poem">
				<h3>{poem.id}</h3>
				<p><b>Název</b> - {poem.name}</p>
				<p><b>Autor</b> - {poem.author}</p>
				<pre>{poem.text}</pre>
				<p><b>album</b> - {poem.albumId}</p>
				<p><b>Přístupnost mládeži</b> - {poem.explicit ? "explicitní" : "normálka"}</p>
				<p><b>Váha</b> - {poem.weight}</p>
				<input type="button" value="Zobrazit" on:click={() => goto(`/album/${poem.albumId}#${poem.id}`)} />
				<input type="button" value="Editovat" on:click={() => redirectPoem(poem)} />
				<input type="button" value="Smazat" on:click={() => deletePoem(poem)} />
			</div>
		{/each}
	</div>
</div>
