<script>
	import 'iconify-icon';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import * as Avatar from '$lib/components/ui/avatar';
	import ChatBubble from '$lib/components/elements/ChatBubble.svelte';
	import UploadPhoto from './uploadPhoto.svelte';

	import { db, userID, userPrivateData } from '$lib/firebase/firebase';
	import { arrayUnion, doc, writeBatch } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	const categories = [
		{ value: 'xray', label: 'Pneumonia X-ray' },
		{ value: 'mri', label: 'Brain MRI Scan' },
		{ value: 'ct', label: 'Eye CT Scan' },
		{ value: 'skin', label: 'Skin Disease Scan' },
		{ value: 'form', label: 'Others' }
	];

	let newScan = {
		title: '',
		id: '',
		description: '',
		image: '',
		category: '',
		aiDiagnosis: '',
		doctorDiagnosis: '',
		remarks: ''
	};

	async function uploadScan() {
		alert('Uploading scan');
		const batch = writeBatch(db);

		if ($userID === null) return;
		batch.update(doc(db, 'private', $userID.user), { reports: arrayUnion(newScan) });

		await batch.commit();
		alert('finished upload scan');
	}
</script>

<div class="row-span-1 grid h-[90vh] grid-rows-1 p-4">
	<!-- Reports Part -->
	<div class="flex w-full flex-col rounded-sm p-1">
		<Dialog.Root>
			<div class="flex items-end justify-between px-1">
				<h1 class="text-xl font-semibold">Your Reports</h1>
				<Dialog.Trigger><Button class="text-md bg-green-600 px-6 py-4">Scan</Button></Dialog.Trigger>
			</div>

			<!-- List of Reports -->
			<div class="mt-4 overflow-auto rounded-md border-2 border-gray-200 bg-gray-100 p-2 shadow-inner">
				<!-- {JSON.stringify($userPrivateData)} -->
				{#each $userPrivateData?.reports ?? [] as report}
					<a href={`dashboard/${report.title}`}>
						<Card.Root class="mb-2">
							<Card.Header>
								<Card.Title>Scan Type</Card.Title>
								<Card.Description>11:11 AM, 11/11/1111</Card.Description>
							</Card.Header>
						</Card.Root>
					</a>
				{/each}

				<!-- text with plus button -->
				<Dialog.Trigger>
					<div class="flex h-max flex-col items-center justify-center p-[8vw] py-16 text-center text-gray-400">
						<p>Click here or press the 'Scan' button to upload image for AI report</p>
						<div class="h-4"></div>
						<iconify-icon icon="icons8:plus" height="48px" class="opacity-70"></iconify-icon>

						<!-- Upload Image for scan dialogue -->
						<Dialog.Content class="w-[95%] sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Upload to Scan</Dialog.Title>
								<Dialog.Description>Upload your image here. Alchemaid AI will prepare the report for you.</Dialog.Description>
							</Dialog.Header>

							<div class="flex w-full max-w-sm flex-col gap-1.5">
								<Label for="title">Title</Label>
								<Input type="text" id="title" placeholder="Title" bind:value={newScan.title} />
							</div>

							<div class="flex w-full max-w-sm flex-col gap-1.5">
								<Label for="id">ID</Label>
								<Input type="text" id="id" placeholder="ID" bind:value={newScan.id} title={newScan.title} bind:aiDiagnosis={newScan.aiDiagnosis} />
							</div>

							<UploadPhoto bind:downloadURL={newScan.image} />

							<!-- Categories for selection of type of scan -->
							<Select.Root
								onSelectedChange={(item) => {
									newScan.category = item?.value;
								}}
							>
								<Select.Trigger class="m-[5px] w-[97%]">
									<Select.Value placeholder="Select a category" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each categories as category}
											<Select.Item value={category.value} label={category.label}>{category.label}</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="chosenCategory" />
							</Select.Root>

							<Dialog.Footer>
								<Button on:click={uploadScan}>Upload</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</div>
				</Dialog.Trigger>
			</div>
		</Dialog.Root>
	</div>

	<!-- Your Doctor Part -->
	<div class="mb-12 mt-4 w-full self-end rounded-sm p-1">
		<div class="flex items-center justify-between px-1">
			<h1 class="text-xl font-semibold">Your Doctor</h1>
		</div>

		<!-- Condition that checks if the user has an appointed Doctor already -->
		<!-- if yes -->
		<Card.Root class="my-2">
			<Card.Header class="flex flex-row items-center gap-2">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="h-full w-full">
					<Card.Title>Doctor Name</Card.Title>
					<Card.Description>Speciality & Description</Card.Description>
				</div>
			</Card.Header>
		</Card.Root>
		<!-- else just show appoint new doctor button -->
		<div class="flex flex-col items-center">
			<Button class="text-md w-full bg-teal-600 bg-opacity-75 px-6 py-4">Appoint New Doctor</Button>
		</div>
	</div>

	<!-- Chat icon -->
	<ChatBubble />
</div>
