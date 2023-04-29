<script lang="ts">
	import "$lib/styles/global.css";
	import "$lib/styles/edit.css";
	import type { Poem } from "$lib/types";
	import { goto } from "$app/navigation";

	export let data: Poem;

	let inputPoem: Poem = {
		id: data.id,
		name: data.name,
		author: data.author,
		text: data.text,
		albumId: data.albumId,
		explicit: data.explicit
	};

	export async function updatePoem(poem: Poem) {
		console.log(poem);
		if (!poem.id) {
			throw new Error("Invalid poem id");
		}

		if (!poem.name || !(poem.name.length > 0 && poem.name.length < 256)) {
			alert("Jmeno blbe");
		}
		if (!poem.author || !(poem.author.length > 0 && poem.author.length < 256)) {
			alert("Autor blbe");
		}
		if (!poem.albumId) {
			throw new Error("album id blbe");
		}
		if (!poem.text) {
			throw new Error("text blbe");
		}

		const res = await fetch(`/api/poem`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				poemId: poem.id,
				name: poem.name,
				author: poem.author,
				text: poem.text,
				albumId: poem.albumId,
				explicit: poem.explicit
			})
		});

		if (res.status === 200) {
			alert("Basnicka upravena");
			goto("/admin/dashboard");
		} else {
			alert(`Neco se pokazilo\n${res.status} ${await res.text()}`);
		}
	}
</script>

<form>
	<p>{data.id}</p>
	<input type="text" placeholder="Název" bind:value={inputPoem.name} />
	<br />
	<input type="text" placeholder="Autor" bind:value={inputPoem.author} />
	<br />
	<textarea placeholder="Text" bind:value={inputPoem.text} />
	<br />
	<input type="text" placeholder="Album ID" bind:value={inputPoem.albumId} />
	<p>Explicitní?!</p>
	<input type="checkbox" bind:value={inputPoem.explicit} />
	<br />
	<input type="button" value="Upravit" on:click={() => updatePoem(inputPoem)} />
</form>
