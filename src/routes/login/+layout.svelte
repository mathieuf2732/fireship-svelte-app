<script lang="ts">
	import { page } from "$app/stores";
	import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
	import ProfileLink from "$lib/components/ProfileLink.svelte";
	import { userData } from "$lib/firebase";

	let { children } = $props();
</script>

<nav class="flex justify-center my-6">
	<ul class="steps">
		<a href="/login" class="step step-primary">Sign In</a>
		<a
			href="/login/username"
			class="step"
			class:step-primary={$page.route.id?.match(/username|photo/g)}>Choose Username</a
		>
		<a href="/login/photo" class="step" class:step-primary={$page.route.id?.includes("photo")}
			>Upload Photo</a
		>
	</ul>
</nav>

<AnimatedRoute>
	<main>
		<div class="card w-1/3 bg-neutral text-neutral-content mx-auto">
			<div class="card-body items-center text-center">
				{@render children()}
			</div>
		</div>
	</main>
</AnimatedRoute>

{#if $userData?.username}
	<div class="w-1/6 mx-auto text-center">
		<ProfileLink />
	</div>
{/if}
