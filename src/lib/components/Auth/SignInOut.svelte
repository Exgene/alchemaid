<script lang="ts">
	import { Icons } from '$lib/components/docs/icons';
	import { Button } from '$lib/components/ui/custom_button';

	import { auth } from '$lib/firebase/firebase';
	import { user } from '$lib/firebase/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	}

	async function signOutSSR() {
		await signOut(auth);
	}
</script>

{#if $user}
	<Button variant="ghost" on:click={signOutSSR}>Sign out</Button>
{:else}
	<Button variant="ghost" on:click={signInWithGoogle}>
		<Icons.google class="mr-2 h-4 w-4" />
		Login
	</Button>
{/if}
