<script lang="ts">
	import { user, userData, userLoaded } from '$lib/firebase/firebase';
	import { Button } from '../ui/custom_button';
	export let currentUsername: string | undefined;
</script>

{#if !$userLoaded}
	<span></span>
{:else if $user && $userData && $userData.username === currentUsername}
	<a href="/{$userData.username}/edit" class="text-center"><Button class="border bg-transparent text-primary" variant={'secondary'}>Edit Profile</Button></a>
{/if}
