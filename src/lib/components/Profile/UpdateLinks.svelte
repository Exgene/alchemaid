<script lang="ts">
	import SortableList from '$lib/components/Profile/SortableList.svelte';
	import UserLink from '$lib/components/Profile/UserLink.svelte';
	import { db, userData, userID, userProfileData } from '$lib/firebase/firebase';
	import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { writable } from 'svelte/store';

	import { Button, buttonVariants } from '$lib/components/ui/custom_button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';

	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';

	let disabled = false;
	const icons: Array<{ value: string; label: string }> = [
		{ value: 'instagram', label: 'Instagram' },
		{ value: 'twitter', label: 'Twitter' },
		{ value: 'linkedin', label: 'LinkedIn' },
		{ value: 'github', label: 'GitHub' },
		{ value: 'custom', label: 'Custom' }
	];
	const formDefaults = {
		icon: 'instagram',
		title: '',
		url: 'https://'
	} satisfies formType;

	type formType = {
		icon: string;
		title: string;
		url: string;
	};

	const formData = writable(formDefaults);

	let showForm = false;

	$: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
	$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
	$: formIsValid = urlIsValid && titleIsValid;

	function sortList(e: CustomEvent) {
		const newList = e.detail;
		const userRef = doc(db, 'profile', $userID!.user);
		setDoc(userRef, { links: newList }, { merge: true });
	}

	async function addLink(e: SubmitEvent) {
		const userRef = doc(db, 'profile', $userID!.user);

		await updateDoc(userRef, {
			links: arrayUnion({
				...$formData,
				id: Date.now().toString()
			})
		});

		formData.set({
			icon: 'instagram',
			title: '',
			url: ''
		});

		showForm = false;
	}

	async function deleteLink(item: any) {
		const userRef = doc(db, 'profile', $userID!.user);
		await updateDoc(userRef, {
			links: arrayRemove(item)
		});
	}

	function cancelLink() {
		formData.set(formDefaults);
		showForm = false;
	}
</script>

<div class="grid-item flex flex-col border">
	<h1 class="text-2xl font-medium">Update your social links</h1>
	<p class="mt-1 text-base text-muted">Drag and drop to reorder your links</p>
	<Dialog.Root>
		{#if $userProfileData?.links?.length !== 8}
			<Dialog.Trigger class="{buttonVariants({ variant: 'secondary' })} m-2 w-1/3 min-w-fit self-center rounded-full border border-primary bg-transparent">Add Links</Dialog.Trigger>
		{:else}
			<p>You have reached max link limit!</p>
		{/if}

		<Dialog.Content class="sm:max-w-[425px]">
			{#if $userProfileData?.links?.length !== 8}
				<form on:submit|preventDefault={addLink}>
					<Dialog.Header class="mb-4">
						<Dialog.Title>Add a Link</Dialog.Title>
						<Dialog.Description>Enter the details of your link.</Dialog.Description>
					</Dialog.Header>

					<div class="flex flex-col gap-4">
						<Select.Root
							onSelectedChange={(item) => {
								disabled = false;
								// @ts-ignore
								$formData.icon = item?.value;

								if (item?.value !== 'custom') {
									// @ts-ignore
									$formData.title = item?.label;
									disabled = true;
								}
							}}
						>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Select an icon" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Icons</Select.Label>
									{#each icons as icon}
										<Select.Item {...icon}>{icon.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>

						<Input name="title" type="text" placeholder={'Enter a title'} bind:value={$formData.title} {disabled} />
						<Input name="url" type="text" placeholder="URL" bind:value={$formData.url} />

						<Label>
							{#if !titleIsValid || !urlIsValid}
								New link must have valid title and URL
							{/if}
							{#if formIsValid}
								Looks good!
							{/if}
						</Label>
					</div>

					<Dialog.Footer class="mt-4">
						<Button type="submit" disabled={!formIsValid}>Add Link</Button>
					</Dialog.Footer>
				</form>
			{:else}
				<p>You have reached max link limit!</p>
			{/if}
		</Dialog.Content>
	</Dialog.Root>

	<SortableList list={$userProfileData?.links ?? []} on:sort={sortList} let:item let:index>
		<div class="group relative">
			<UserLink {...item} disabled={true} />
			<!-- <Button on:click={() => deleteLink(item)} class="absolute -right-4 bottom-6 bg-transparent hover:bg-transparent duration-300 transition-all"><iconify-icon icon="mdi:instagram" height="20" /></Button> -->
			<button on:click={() => deleteLink(item)} class="absolute -right-5 bottom-5 cursor-pointer rounded-md px-4 py-1 text-primary opacity-0 transition-all group-hover:opacity-100"><iconify-icon icon="maki:cross" height="20"></iconify-icon></button>
		</div>
	</SortableList>
</div>

<style>
	.grid-item {
		grid-column: 2/3;
		grid-row: 1/2;
	}
</style>
