<script lang="ts">
	import { userData } from "$lib/firebase";
</script>

{#if $userData?.username}
	<a class="btn mt-3" href={`/${$userData.username}`}>Go to your profile</a>
{/if}
