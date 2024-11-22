<script lang="ts">
	import { user, userData } from "$lib/firebase";
	import "../app.css";
	let { children } = $props();

	// Preload global data
	$user;
	$userData;
</script>

<div class="min-h-screen flex flex-col">
	{@render children()}
</div>
