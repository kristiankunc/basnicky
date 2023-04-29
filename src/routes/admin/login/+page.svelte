<script lang="ts">
	import { goto } from "$app/navigation";
	import { Auth } from "$lib/auth";
	import { redirect } from "@sveltejs/kit";

	let password = "";
	let res = "";

	async function checkPassword() {
		if (!password) {
			res = "Chybí heslo!";
			password = "";
			return;
		}

		if (await Auth.clientCheck(password)) {
			res = "Heslo je správné! Přesměrovávám...";
			password = "";

			goto("/admin/dashboard");
		} else {
			res = "Heslo je špatné!";
			password = "";
		}
	}
</script>

<input type="password" placeholder="Zadej heslo :)" bind:value={password} />
<button on:click={checkPassword}>Prověřit 🧐</button>
<br />
<p>{res}</p>
