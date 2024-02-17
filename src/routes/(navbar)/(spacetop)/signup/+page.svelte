<script lang="ts">
	import UserAuthForm from '$lib/components/Auth/user-auth-form.svelte';
	import { userLoaded } from '$lib/firebase/firebase';
</script>

<div class="container relative flex h-[85vh] flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		{#if $userLoaded}
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>

				<p class="text-sm text-muted-foreground">Signup using Google to create a new account</p>
			</div>
			<UserAuthForm />
			<p class="px-8 text-center text-sm text-muted-foreground">
				By creating an account, you agree to our{' '}
				<a href="/terms" class="underline underline-offset-4 hover:text-primary"> Terms of Service </a>{' '}
				and{' '}
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary"> Privacy Policy </a>
				.
			</p>
		{:else}
			loading
		{/if}
	</div>
</div>
