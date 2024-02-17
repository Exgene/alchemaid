<script lang="ts">
	import { backgroundColor } from '$lib/actions/style';
	import EditButton from '$lib/components/Auth/EditButton.svelte';
	import UserLink from '$lib/components/Profile/UserLink.svelte';

	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { darkTheme } from '$lib/stores/theme';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username} | Alchemaid</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<svelte:body
	use:backgroundColor={{
		color_light: data.color_light ?? '',
		color_dark: data.color_dark ?? '',
		darkTheme: $darkTheme
	}}
/>
<div class="mx-2 my-4 grid items-center justify-center sm:my-6 lg:grid-cols-2 lg:px-24">
	<!-- <h1 class="mt-2 text-center text-3xl sm:text-4xl">Profile</h1> -->
	<div class="flex h-auto w-full max-w-xl flex-col items-center justify-center gap-y-3 rounded-md bg-opacity-5 p-8 lg:ml-10">
		{#if data.photoURL}
			<img src={data.photoURL} alt="photoURL" class="aspect-square w-32 rounded-md object-cover sm:w-52" />
		{:else}
			<img src={'/fallback-image.jpg'} alt="photoURL" class="aspect-square w-32 rounded-full object-cover md:w-52" />
		{/if}
		<h1 class="text-center text-lg font-bold md:text-2xl">{data.name}</h1>
		<Separator class="h-[0.5px] w-2/3 bg-primary" />
		<p class="mb-2 text-center text-sm text-muted md:text-base">{data.bio ?? 'No bio yet'}</p>
	</div>
	<div>
		<h1 class="mt-4 text-center text-2xl font-semibold text-primary sm:text-4xl">Find me at...</h1>

		{#if data.links && data.links.length > 0}
			<ul class="flex list-none flex-wrap justify-center gap-4 sm:my-6">
				{#each data.links as item}
					<UserLink {...item} />
				{/each}
			</ul>
		{/if}
	</div>
</div>

<Separator class="bg-primary" />

<!-- <EditButton currentUsername={data.username} /> -->
