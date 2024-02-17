<script lang="ts">
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
	import { Timestamp, arrayUnion, doc, writeBatch } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	const categories = [
		{ value: 'chest-xray', label: 'Pneumonia X-ray' },
		{ value: 'brain-mri', label: 'Brain MRI Scan' },
		{ value: 'eye-ct', label: 'Eye CT Scan' },
		{ value: 'skin-disease', label: 'Skin Disease Scan' },
		{ value: 'report', label: 'Others' }
	];

	interface Report {
		title: string;
		id: string;
		description: string;
		image: string;
		category: string;
		aiDiagnosis: string;
		doctorDiagnosis: string;
		remarks: string;
		uploadTime?: Date;
	}

	let newScan: Report = {
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
		const batch = writeBatch(db);

		if ($userID === null) return;
		batch.update(doc(db, 'private', $userID.user), { reports: arrayUnion({ ...newScan, uploadTime: Timestamp.now() }) });

		await batch.commit();
	}

	async function deleteEntry(i: number) {
		const batch = writeBatch(db);

		if ($userID === null) return;
		if (!$userPrivateData?.reports) return;
		batch.update(doc(db, 'private', $userID.user), { reports: [...$userPrivateData?.reports.slice(0, i), ...$userPrivateData?.reports.slice(i + 1, $userPrivateData?.reports.length)] });

		await batch.commit();
	}
</script>

<div class="row-span-1 flex flex-col h-fit p-4 w-full items-center">
	<!-- Reports Part -->
	<div class="flex md:w-1/2 flex-col rounded-sm p-1">
		<Dialog.Root>
			<div class="flex items-end justify-between px-1">
				<h1 class="text-xl font-semibold">Your Reports</h1>
				<Dialog.Trigger><Button class="text-md bg-green-600 px-6 py-4">Scan</Button></Dialog.Trigger>
			</div>

			<!-- List of Reports -->
			<div class="mt-4 gap-x-3 overflow-auto rounded-md border-2 border-gray-200 bg-gray-100 p-2 shadow-inner dark:border-black dark:bg-gray-800">
				<!-- {JSON.stringify($userPrivateData)} -->
				{#each $userPrivateData?.reports ?? [] as report, i}
					<div class=" flex items-center">
						<a href={`dashboard/${report.title}`} class="mr-1 flex w-full">
							<Card.Root class="mb-2 w-full">
								<Card.Header>
									<Card.Title>{report.title}</Card.Title>
									<Card.Description>Type of Report: {report.category}</Card.Description>
									<!-- <Card.Description>Date Uploaded: {report.uploadTime}</Card.Description> -->
								</Card.Header>
							</Card.Root>
						</a>
						<Button on:click={() => deleteEntry(i)} class="hidden w-20 md:block">Delete</Button>
						<Button on:click={() => deleteEntry(i)} class="h-full w-5 md:hidden">x</Button>
					</div>
				{/each}

				<!-- Button to add a new scan -->
				<Dialog.Trigger class='w-full'>
					<div class="flex h-max w-full flex-col items-center justify-center bg-gray-200 p-16 text-center text-gray-400 dark:bg-gray-700">
						<p>Click here or press the 'Scan' button to upload image for AI report</p>
						<div class="h-4"></div>
						<iconify-icon icon="icons8:plus" height="48px" class="opacity-70"></iconify-icon>

						<!-- Upload Image for scan dialogue -->
						<Dialog.Content class="w-[95%] sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Upload to Scan</Dialog.Title>
								<Dialog.Description>Upload your report here. Alchemaid AI will analyse the report for you.</Dialog.Description>
							</Dialog.Header>

							<!-- Category -->
							<Select.Root
								onSelectedChange={(item) => {
									newScan.category = item?.value;
								}}
							>
								<Select.Trigger class="w-full max-w-sm">
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

							<!-- Title -->
							<div class="flex w-full max-w-sm flex-col gap-1.5">
								<!-- <Label for="title">Title</Label> -->
								<Input type="text" id="title" placeholder="Title" bind:value={newScan.title} />
							</div>

							<!-- ID -->
							<div class="flex w-full max-w-sm flex-col gap-1.5">
								<!-- <Label for="id">ID</Label> -->
								<Input type="text" id="id" placeholder="ID" bind:value={newScan.id} />
							</div>

							<!-- Image -->
							<div class="flex w-full max-w-sm flex-col gap-1.5">
								<Label for="image">Upload image/photo</Label>
								<!-- <input type="file" accept="image/*" placeholder="Capture Image" capture /> -->
								<UploadPhoto bind:downloadURL={newScan.image} title={newScan.title} category={newScan.category} bind:aiDiagnosis={newScan.aiDiagnosis} />
							</div>

							<Dialog.Footer>
								<Button on:click={uploadScan}>Upload Report to Database</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</div>
				</Dialog.Trigger>
			</div>
		</Dialog.Root>
	</div>
	
	
	<hr class="mt-8 w-full">
	<!-- Your Doctor Part -->
	<div class="mb-12 mt-4 w-full self-end rounded-sm p-1">
		<div class="flex items-center justify-center px-1">
			<h1 class="text-xl font-semibold text">Your Doctor</h1>
		</div>
		<div class="h-4"></div>

		<!-- Condition that checks if the user has an appointed Doctor already -->
		<!-- if yes -->
		<!-- <Card.Root class="my-2">
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
		</Card.Root> -->
		<!-- else just show appoint new doctor button -->
		<div class="flex flex-col items-center">
			<a href="dashboard/doctors"><Button class="text-md w-full bg-teal-600 bg-opacity-75 px-6 py-4">Appoint New Doctor</Button></a>
		</div>
	</div>

	<!-- Chat icon -->
	<ChatBubble />
</div>
