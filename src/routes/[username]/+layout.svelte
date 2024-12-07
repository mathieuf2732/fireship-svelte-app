<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<main class="m-5">
	<a class="btn" href="/login">Go to login</a>
	{@render children()}
</main>
