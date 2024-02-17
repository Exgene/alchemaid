<script lang="ts">
	import { db, userID, userProfileData } from '$lib/firebase/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { exclaim, success } from '../Toast/toast';
	import Button from '../ui/custom_button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	let phone = '';

	const rePhone = /^[0-9]{10}$/;
	$: isValidPhone = phone?.length === 10 && rePhone.test(phone);
	$: isTouchedPhone = phone.length >= 1;

	async function updatePhone(e: Event) {
		if (!isValidPhone) {
			exclaim('Please enter a valid phone number!');
			return;
		}

		const userRef = doc(db, 'profile', $userID!.user);

		await updateDoc(userRef, {
			phone
		});
		success('Updated Phone successfully');
	}
</script>

<div>
	<h1 class="text-2xl font-medium">Update phone number</h1>
	<div class="w-full py-1">
		<Label class="text-base font-medium text-muted"><span>Current: {$userProfileData?.phone ? $userProfileData?.phone : 'none'}</span></Label>
	</div>

	<div class="grid gap-1.5">
		<Input class="border-muted focus:border-primary" name="phone" placeholder="Enter your Phone Number here" bind:value={phone} />
	</div>
	<Button class="mt-4 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updatePhone}>Update Phone</Button>
</div>
