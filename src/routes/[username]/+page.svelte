<script lang="ts">
	import UserLink from "$lib/components/UserLink.svelte";
	import { userData } from "$lib/firebase";
	import type { PageData } from "./$types";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>@{data.username}</title>
	<meta name="Description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-8">
	<h1 class="text-7xl text-purple-500">
		{data.username}
	</h1>

	<img src={data.photoURL ?? "/user.png"} alt="photoUrl" width="256" class="mx-auto" />

	<p class="text-xl my-8">{data.bio ?? "No bio"}</p>

	<ul class="list-none flex flex-col justify-center items-center mx-auto p-0">
		{#each data.links as link}
			<li class="w-80">
				<UserLink {...link} />
			</li>
		{/each}
	</ul>
	{#if $userData?.username == data.username}
		<div class="flex flex-row justify-center">
			<a class="btn mx-1" href={`/${$userData!.username}/edit`}> Edit your links </a>
			<a class="btn mx-1" href={`/${$userData!.username}/bio`}> Edit your bio </a>
			<a class="btn mx-1" href="/login/photo">Edit your photo</a>
		</div>
	{/if}
</main>
