<script lang="ts">
	import type { Album } from "$lib/types";
	import "$lib/styles/global.css";
	import "$lib/styles/index.css";
	import { goto } from "$app/navigation";

	export let data: {
		albums: Album[];
	};

	function redirectToAlbum(id: string) {
		window.location.href = `/album/${id}`;
	}
</script>

<div class="header">
	<h1>Sbírka Básniček</h1>

	<h2>Alba:</h2>
</div>
<div class="albums">
	{#each data.albums as album}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="album" on:click={() => redirectToAlbum(album.id)}>
			<img src={album.image} alt={album.name} width="320" height="320" />
			<div class="album-name">
				<h3>{album.name}</h3>
			</div>
		</div>
	{/each}
</div>
<div class="admin-nav">
	<input type="button" on:click={() => goto("/admin")} value="Admin (zakazany)" />
</div>
