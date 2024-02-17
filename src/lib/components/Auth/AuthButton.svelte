<script lang="ts">
	import { goto } from '$app/navigation';
	import { Icons } from '$lib/components/docs/icons';
	import { Button } from '$lib/components/ui/custom_button';
	import * as Popover from '$lib/components/ui/custom_popover';

	import { auth, user, userData, userLoaded } from '$lib/firebase/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
		loggedIn = true;
	}

	async function signOutSSR() {
		await signOut(auth);
	}

	let loggedIn = false;
</script>

<!-- TODO: wrap everthing in a UserLoadCheck component in the future -->
{#if !$userLoaded}
	<span></span>
{:else if $user && $userData}
	<Popover.Root>
		<Popover.Trigger>
			<Button class="border bg-transparent text-base font-bold text-primary" variant={'secondary'}>You</Button>
		</Popover.Trigger>
		<Popover.Content>
			<div class="flex max-w-xs flex-col gap-2">
				<div class="px-2 text-center text-lg">
					Hello <span class="font-semibold">{$userData.name}</span>
				</div>
				<a href="/{$userData.username}" class="contents"> <Button class="border bg-transparent text-primary" variant={'secondary'}>Your Public Profile</Button> </a>
				<a href="/{$userData.username}/edit" class="contents"><Button class="border bg-transparent text-primary" variant={'secondary'}>Edit Profile</Button></a>
				<Button on:click={signOutSSR}>Sign out</Button>
				{#if $userData?.isDoctor === true}
					<a href="/dashboard" class="contents"><Button class="border bg-transparent text-primary" variant={'secondary'}>Doctor Profile</Button></a>
				{:else}
					<a href="/dashboard" class="contents"><Button class="border bg-transparent text-primary" variant={'secondary'} on:click={()=> $userData ? $userData.isDoctor = true: ''}>Are you a doctor? Join Us</Button></a>
				{/if}
			</div>
		</Popover.Content>
	</Popover.Root>
{:else if $user}
	{#if loggedIn}
		{goto('/create-account')}
	{:else}
		<Popover.Root>
			<Popover.Trigger>
				<Button class="text-lg font-bold duration-200 hover:scale-110" variant="outline">Create Account</Button>
			</Popover.Trigger>
			<Popover.Content>
				<div class="flex max-w-xs flex-col gap-2">
					<div class="px-2 text-lg">
						Hello {$user.displayName}, you don't have an account yet!
					</div>
					<a href="/create-account" class="contents"><Button variant="outline">Create Account</Button></a>
					<Button on:click={signOutSSR}>Sign out</Button>
				</div>
			</Popover.Content>
		</Popover.Root>
	{/if}
{:else}
	<Popover.Root>
		<Popover.Trigger>
			<Button class="border bg-transparent text-base font-bold text-primary" variant={'secondary'}>Login</Button>
		</Popover.Trigger>
		<Popover.Content>
			<div class="flex max-w-xs flex-col gap-2">
				<div class="px-2 text-lg">Login via Google</div>
				<Button on:click={signInWithGoogle}>
					<Icons.google class="mr-2 h-4 w-4" />
					Login
				</Button>
				<div class="px-2 text-lg">Don't have an account?</div>
				<a href="/signup" class="contents"><Button>Signup</Button></a>
			</div>
		</Popover.Content>
	</Popover.Root>
{/if}
