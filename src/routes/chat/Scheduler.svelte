<script lang="ts">
	import ChatBox from './ChatBox.svelte';

	type FinalData = {
		text: string;
		who: string;
		ready: boolean;
		isolateDelay: number;
	};

	export let data: Array<{ text: string; who: string }> = [];

	let transformedData: Array<FinalData> = [];

	function readingTime(text: string) {
		const wps = 480 / 60;
		const words = text.trim().split(/\s+/).length;
		const time = Math.ceil((words / wps) * 1000);
		return time;
	}

	// function to transform data
	function transform(dataElement: { text: string; who: string }) {
		const time = readingTime(dataElement?.text ?? '');
		return {
			...dataElement,
			ready: true,
			isolateDelay: 0
		};
	}

	$: transformedData = [...transformedData, transform(data[data.length - 1])];
</script>

<div>
	{#each transformedData as { text, who, ready, isolateDelay }}
		<ChatBox {who} {text} {ready} {isolateDelay} />
	{/each}
</div>

<style>
	div {
		padding-bottom: 50px;
	}
</style>
