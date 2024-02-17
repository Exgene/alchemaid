<script lang="ts">
	import Chat from './Scheduler.svelte';
	import BouncingDots from './BouncingDots.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
</script>

<main>
	<Chat />
</main>

<div class="fixed inset-x-0 bottom-0 bg-secondary p-4 text-primary">
	<input type="text" placeholder="Type your message..." class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-600" />

	<!-- <form class="flex w-full max-w-lg items-center space-x-2">
		<Input type="email" placeholder="email" />
		<Button type="submit">Subscribe</Button>
	</form> -->
</div>

<style>
	main {
		min-height: 70vh;
		max-width: 800px;
		padding: 10px;
		margin: 50px auto;
	}
</style>
