<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import BouncingDots from './BouncingDots.svelte';
	import Chat from './Scheduler.svelte';

	let data: any = [{ text: 'Hello!', who: 'them' }];
	let text = '';

	const handleSubmit = async () => {
		console.log('Sending message:', text);
		data = [...data, { text: text, who: 'you' }];

		const postmessage = {
			message: text
		};

		// skin-disease - https://skin-disease-jmtugz6wea-el.a.run.app
		// brain-tumor - https://brain-tumor-jmtugz6wea-el.a.run.app
		// gemini - https://gemini-jmtugz6wea-de.a.run.app
		// ai-assistant - https://ai-assistant-jmtugz6wea-el.a.run.app
		// diabetic - https://diabetic-model-jmtugz6wea-de.a.run.app

		const url = 'https://gemini-jmtugz6wea-el.a.run.app';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postmessage)
		})
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					throw new Error('Error occurred. Status Code: ' + response.status);
				}
			})
			.then((responseText) => {
				data = [...data, { text: responseText, who: 'them' }];
				text = '';
			})
			.catch((error) => {
				console.error('Request Error:', error);
			});
	};
</script>

<main>
	<Chat {data} />
</main>

<div class="fixed inset-x-0 bottom-0 bg-secondary p-4 text-primary">
	<div class="flex w-full items-center space-x-2">
		<input type="text" bind:value={text} placeholder="Type your message..." class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-600" />
		<Button on:click={handleSubmit}>Enter</Button>
	</div>
</div>

<style>
	main {
		min-height: 70vh;
		max-width: 800px;
		padding: 10px;
		margin: 50px auto;
	}
</style>
