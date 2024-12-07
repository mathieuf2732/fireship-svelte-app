<script lang="ts">
	import { goto } from "$app/navigation";
	import { auth, user, userData } from "$lib/firebase";
	import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
	import { onDestroy } from "svelte";

	let unsubscribe: () => void;

	onDestroy(() => {
		unsubscribe?.();
	});

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);

		const idToken = await credential.user.getIdToken();

		await fetch("/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
				// Svelte handles csrf token
			},
			body: JSON.stringify({ idToken })
		});

		unsubscribe = userData.subscribe((userData) => {
			if (userData?.username) {
				goto(`/${userData.username}`);
			} else {
				goto("/login/username");
			}
		});
	}

	async function signOutSSR() {
		await fetch("/api/signin", { method: "DELETE" });
		await signOut(auth);
		unsubscribe?.();
	}
</script>

<h2>Login</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success">You are logged in</p>
	<button class="btn btn-warning" onclick={() => signOutSSR()}>Sign out</button>
{:else}
	<button class="btn btn-primary" onclick={signInWithGoogle}>Sign in with Google</button>
{/if}
