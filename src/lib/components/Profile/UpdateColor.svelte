<script lang="ts">
	import Button from '$lib/components/ui/custom_button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { db, userID, userProfileData } from '$lib/firebase/firebase';
	import { toast } from '@zerodevx/svelte-toast';
	import { doc, updateDoc } from 'firebase/firestore';
	import { information, success } from '../Toast/toast';

	let color_light: string = $userProfileData?.color_light ?? '';
	let color_dark: string = $userProfileData?.color_dark ?? '';

	function resetColor() {
		color_light = '';
		color_dark = '';
		updateColor(null);

		information('Color has been reset!');
	}

	async function updateColor(e: Event | null) {
		const userRef = doc(db, 'profile', $userID!.user);

		await updateDoc(userRef, {
			color_light,
			color_dark
		});
		success('Color Updated Successfully!');
	}
</script>

<div>
	<h1 class="text-2xl font-medium">Custom background color</h1>
	<div class="grid w-full grid-cols-2 gap-y-4 pt-2">
		<Label class="flex flex-col gap-y-1 text-primary"><span>Current light color</span> <span class="text-primary">{$userProfileData?.color_light ? $userProfileData?.color_light : 'Default'}</span></Label>
		<Label class="flex flex-col gap-y-1 text-primary"><span>Current dark color</span><span class="text-primary">{$userProfileData?.color_dark ? $userProfileData?.color_dark : 'Default'}</span></Label>
	</div>

	<div class="grid grid-cols-2 gap-1">
		<div>
			<!-- <Label for="color_light">Light mode color</Label> -->
			<Input type="color" name="color_light" bind:value={color_light} class="cursor-pointer border-none" />
		</div>

		<div>
			<!-- <Label for="color_dark">Dark mode color</Label> -->
			<Input type="color" name="color_dark" bind:value={color_dark} class="cursor-pointer border-none" />
		</div>
	</div>
	<Button class="mt-2 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={updateColor}>Update Color</Button>
	<Button class="mt-2 w-1/3 min-w-fit self-center border hover:bg-background" variant="ghost" on:click={resetColor}>Reset Color</Button>

	<!-- <p class="mt-4 text-muted">Note that changing these color will reflect only on profile page and anyone viewing your profile will have that color reflected</p> -->
</div>
