<script lang="ts">
	import { page } from "$app/stores";
	import { db, user, userData } from "$lib/firebase";
	import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
	import { writable } from "svelte/store";
	import SortableList from "$lib/components/SortableList.svelte";
	import type { LinkListItem } from "$lib/Models/LinkItem";
	import UserLink from "$lib/components/UserLink.svelte";

	const icons = ["Youtube", "LinkedIn", "GitHub", "Custom"];

	const formDefaults = {
		icon: "custom",
		title: "",
		url: "https://"
	};

	const formData = writable(formDefaults);

	let showForm = $state(false);

	let isUrlValid = $derived($formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/));
	let isTitleValid = $derived($formData.title.length < 20 && $formData.title.length > 0);
	let isFormValid = $derived(isUrlValid && isTitleValid);

	async function addLink(e: SubmitEvent) {
		e.preventDefault();
		const userRef = doc(db, "users", $user!.uid);

		await updateDoc(userRef, {
			links: arrayUnion({
				...$formData,
				id: Date.now().toString()
			})
		});

		formData.set({
			icon: "",
			title: "",
			url: ""
		});

		showForm = false;
	}

	function sortList(list: any) {
		const userRef = doc(db, "users", $user!.uid);
		setDoc(userRef, { links: list }, { merge: true });
	}

	async function deleteLink(item: any) {
		const userRef = doc(db, "users", $user!.uid);
		await updateDoc(userRef, {
			links: arrayRemove(item)
		});
	}

	function cancelLink() {
		formData.set(formDefaults);
		showForm = false;
	}
</script>

<main class="max-w-xl mx-auto">
	{#if $userData?.username == $page.params.username}
		<h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">Edit your profile</h1>

		<SortableList list={$userData?.links} sort={sortList}>
			{#snippet snipped(item, index)}
				<div class="group relative">
					<UserLink {...item as any} />
					<button
						class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
						onclick={() => deleteLink(item)}>Delete</button
					>
				</div>
			{/snippet}
		</SortableList>

		{#if showForm}
			<form onsubmit={addLink} class="bg-base-200 p-6 w-full mx-auto rounded-xl">
				<div class="flex flex-col gap-2">
					<select class="select" bind:value={$formData.icon}>
						{#each icons as icon}
							<option value={icon.toLowerCase()}>{icon}</option>
						{/each}
					</select>
					<input
						name="title"
						type="text"
						placeholder="Title"
						class="input"
						bind:value={$formData.title}
					/>
					<input
						name="url"
						type="text"
						placeholder="URL"
						class="input"
						bind:value={$formData.url}
					/>
				</div>
				<div class="my-4">
					{#if !isTitleValid}
						<p class="text-error text-xs">Must have valid title</p>
					{/if}
					{#if !isUrlValid}
						<p class="text-error text-xs">Must have valid URL</p>
					{/if}
					{#if isFormValid}
						<p class="text-success text-xs">Looks good!</p>
					{/if}
				</div>

				<button disabled={!isFormValid} type="submit" class="btn btn-success block">
					Add link
				</button>

				<button type="button" class="btn btn-xs my-4" onclick={cancelLink}>Cancel</button>
			</form>
		{:else}
			<button onclick={() => (showForm = true)} class="btn btn-outline btn-info block mx-auto my-4">
				Add a link
			</button>
		{/if}
	{/if}
</main>
