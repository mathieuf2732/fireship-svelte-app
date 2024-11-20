<script lang="ts">
	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	interface Props {
		children: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

{#key $page.url}
	<div in:fly={{ x: "-100%", duration: 500 }}>
		{@render children?.()}
	</div>
{/key}
