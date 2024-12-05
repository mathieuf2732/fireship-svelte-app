<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<main class="max-w-lg prose text-center mx-auto my-6">
	<p>Current bio: <span class="text-info">{data.bio}</span></p>

	<p>Status code: {$page.status}</p>
	<p class="text-error">{$page.form?.problem ?? ""}</p>

	<form method="POST" use:enhance>
		<div class="form-control">
			<label for="bio" class="label">
				<span class="label-text">Your Bio</span>
			</label>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<textarea name="bio" class="textarea textarea-bordered textarea-accent" value={data.bio} />
		</div>
		<button type="submit" class="btn btn-primary my-5">Udpdate Bio</button>
	</form>
</main>
