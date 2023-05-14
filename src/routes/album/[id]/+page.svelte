<script lang="ts">
	import type { Album, Poem } from "$lib/types";
	import "$lib/styles/global.css";
	import "$lib/styles/album.css";
	import { goto } from "$app/navigation";

	export let data: {
		album: Album;
		poems: Poem[];
	};

	function unblur(poem: Poem) {
		const poemDiv = document.getElementById(poem.id);
		if (!poemDiv) return;
		const pre = poemDiv.querySelector("pre");
		if (!pre) return;
		pre.classList.remove("blur");
	}
</script>

<div class="header">
	<h1>{data.album.name}</h1>
	<img src={data.album.image} alt={data.album.name} height="320" width="320" />
	<div>
		<h2>Obsah:</h2>
		{#each data.poems as poem}
			<li><a href="#{poem.id}">{poem.name}</a></li>
		{/each}
	</div>
	<br />
	<input type="button" on:click={() => goto("/")} value="Zu Hause gehen" />
</div>
<div class="poems">
	{#each data.poems as poem}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="poem" id={poem.id} on:click={() => unblur(poem)}>
			<h2>{poem.name}</h2>
			<p><i>Autor: {poem.author}</i></p>
			{#if poem.explicit}
				<p><i>Explicitní</i></p>
			{/if}
			<pre class="poem-text {poem.explicit ? 'blur' : ''}">{poem.text}</pre>
		</div>
	{/each}
</div>
