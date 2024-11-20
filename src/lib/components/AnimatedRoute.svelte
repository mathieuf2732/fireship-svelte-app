<script lang="ts">
	import { page } from "$app/stores";
	import type { Snippet } from "svelte";
	import { fly } from "svelte/transition";

	let { children }: { children: Snippet } = $props();
</script>

{#key $page.url}
	<div in:fly={{ x: "-100%", duration: 500 }}>
		{@render children?.()}
	</div>
{/key}
