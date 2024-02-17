<script lang="ts">
	import { db, userID, userProfileData } from '$lib/firebase/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { exclaim, success } from '../Toast/toast';
	import Button from '../ui/custom_button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Textarea from '../ui/textarea/textarea.svelte';

	let bio: string = '';

	async function updateBio(e: Event) {
		if (bio === '') {
			exclaim('Enter something in the bio!');
			return;
		}
		const userRef = doc(db, 'profile', $userID!.user);

		await updateDoc(userRef, {
			bio
		});
		success('Updated Bio successfully');
	}
	let msg = '';
	$: if (bio.length >= 150) {
		msg = 'You have reached the maximum character limit!';
	} else {
		msg = '';
	}
</script>

<h1 class="text-2xl font-medium md:mt-4 lg:mt-0">Update description</h1>

<div class="mt-1 w-full pb-4">
	<Label class="text-base font-normal text-muted">{$userProfileData?.bio}</Label>
</div>

<div class="grid gap-1.5">
	<Textarea name="bio" placeholder="Type your new bio here!" bind:value={bio} class="resize-none border-muted focus:border-primary" rows={5} maxlength={150} />
	<p class="font-medium text-red-600">{msg}</p>
</div>
<Button class="mt-2 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updateBio}>Update Bio</Button>
