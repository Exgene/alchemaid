<script lang="ts">
	import { Icons } from '$lib/components/docs/icons';
	import { Button } from '$lib/components/ui/custom_button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	import { auth, userData } from '$lib/firebase/firebase';
	import { user } from '$lib/firebase/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	let redirect = $page.url.searchParams.get('redirect') ?? '';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	}

	async function signOutSSR() {
		await signOut(auth);
	}
</script>

{#if $user && $userData}
	<!-- {goto('/{$userData.username}/edit')} -->
	<Card.Root class="m-2">
		<Card.Content class="flex flex-col gap-4">
			<h1 class="card-title mt-4 text-lg">Welcome, {$user.displayName}</h1>
			<p>You already have an account.</p>
		</Card.Content>
		<Card.Footer>
			<a class="w-full" href="/{$userData.username}/edit"> <Button class="w-full">Account settings</Button></a>
		</Card.Footer>
	</Card.Root>
{:else if $user}
	{#if redirect !== ''}
		{goto('/create-account')}
	{:else}
		{goto('/create-account?redirect=' + redirect)}
	{/if}
	<!-- <Card.Root class="m-2">
		<Card.Content class="mt-4 flex flex-col gap-4">
			<h2 class="card-title">Welcome, {$user.displayName}</h2>
			<p>You are signed in! To continue your account creation process, click on Create Account.</p>
		</Card.Content>
		<Card.Footer>
			<a class="w-full" href="/create-account"> <Button class="w-full">Create account</Button></a>
		</Card.Footer>
	</Card.Root> -->
{:else}
	<Button variant="outline" on:click={signInWithGoogle}>
		<Icons.google class="mr-2 h-4 w-4" />
		Google
	</Button>
{/if}
