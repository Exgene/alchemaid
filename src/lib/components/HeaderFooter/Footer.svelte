<script>
	import 'iconify-icon';
	import { NAVITEM } from '$lib/data/NavbarItems';
	import { page } from '$app/stores';
</script>

<hr />

<div class="flex w-full flex-col items-center justify-between px-4 py-3 md:flex md:px-16 md:py-6">
	<div class="flex flex-row flex-wrap content-center items-center justify-center py-5">
		<div class="px-2">
			<img class="h-10 w-10" src="/assets/logo.png" alt="" />
		</div>
		<div class="md:text-md py-3 text-center text-sm lg:text-lg">Alchemaid - Team Code Crunch</div>
	</div>

	<ul class={'flex space-x-8 text-black dark:text-white'}>
		<a href={'https://github.com/codcrunch/innerve8'} target={'_blank'} class="duration-200 hover:scale-110">
			<iconify-icon icon="mdi:github" height="2rem" />
		</a>
	</ul>

	<ul class="flex flex-wrap justify-center py-5">
		{#each NAVITEM as item}
			<a href={`${item.href}`}>
				<li class="text-md px-2 md:px-5" class:underline={$page.url.pathname.split('/')[1] === item.title.toLowerCase() || ($page.url.pathname === '/' && item.title === 'Home')}>
					<span>{item.title}</span>
				</li>
			</a>
		{/each}
	</ul>

	<a href="https://github.com/codcrunch" target="_blank"><span class="md:text-md text-sm">Innerve 8.0 (Army Institute of Technology)</span></a>

	<div>
		<h1 class="pt-3 text-xl">© CODE CRUNCH 2024</h1>
	</div>
</div>
