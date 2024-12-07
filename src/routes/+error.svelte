<script lang="ts">
	import { page } from "$app/stores";
</script>

<main class="mx-auto pt-40 text-center">
	<h1 class="text-6xl">{$page.error?.message}</h1>
	<img src="https://http.cat/status/404.jpg" alt="silly car" class="m-5" />
	<a class="btn" href="/login">Go back to login</a>
</main>
