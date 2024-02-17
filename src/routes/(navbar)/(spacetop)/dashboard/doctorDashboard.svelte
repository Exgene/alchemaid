<script>
	import 'iconify-icon';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import ChatBubble from '$lib/components/elements/ChatBubble.svelte';
</script>

<div class="row-span-1 grid h-[90svh] grid-rows-1 p-4">

	<!-- Patients Part -->
	<div class="flex w-full flex-col rounded-sm p-1">
		<div class="flex items-end justify-between px-1">
			<h1 class="text-xl font-semibold">Your Patients</h1>
			<iconify-icon icon="streamline:notification-alarm-2-solid" width="24px" height="24px"></iconify-icon>
		</div>
		<!-- List of Patients -->
		<div class="mt-4 overflow-auto rounded-md border-2 border-gray-200 bg-gray-100 p-2 shadow-inner">
			{#each { length: 7 } as _}
				<Card.Root class="my-2">
					<Card.Header class="flex flex-row items-center gap-2">
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="h-full w-full">
							<Card.Title>Patient Name</Card.Title>
							<Card.Description>Consultancy Reason</Card.Description>
						</div>
						<iconify-icon icon="fluent:dismiss-square-multiple-20-filled" width="28px" style="color: #ff0000"></iconify-icon>
					</Card.Header>
				</Card.Root>
			{/each}
		</div>
	</div>

    <!-- AI Scan -->
    <div class="mb-12 mt-8 w-full self-end rounded-sm p-1">
        <h1 class="text-xl font-semibold">Try our AI for medical scan interpretation :</h1>
        <Button class="text-md mt-2 w-full bg-green-600 bg-opacity-75 px-6 py-4">Scan</Button>
    </div>

    <!-- Chat Bubble -->
    <ChatBubble />
</div>
