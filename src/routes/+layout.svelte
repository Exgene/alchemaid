<script lang="ts">
	import { navigating } from '$app/stores';
	import { called, user, userData, userLoaded, userProfileData } from '$lib/firebase/firebase';
	import DarkLoader from '$lib/loader/DarkLoader.svelte';
	import LightLoader from '$lib/loader/LightLoader.svelte';
	import { loading } from '$lib/stores/loading';
	import { darkTheme } from '$lib/stores/theme';

	import '../app.css';
	/* Subscribe to stores in root layout */
	$darkTheme;
	$user;
	$userData;
	$userProfileData;

	$userLoaded;
	$called;

	//$: console.log('user', $userData);
	$: $loading = !!$navigating;
</script>

{#if $loading}
	{#if $darkTheme}
		<DarkLoader />
	{:else}
		<LightLoader />
	{/if}
{:else}
	<slot />
{/if}

<style>
	:root {
		--toastWidth: 300px;
		--toastHeight: auto;
		--toastPadding: 0 0 0 0.5rem;
	}
	.wrapper {
		/* --toastWidth: 250px;
		--toastContainerTop: -33%;
		--toastContainerLeft: calc(25vw); */
		--toastContainerTop: 1rem;
		--toastContainerRight: auto;
		--toastContainerBottom: auto;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
