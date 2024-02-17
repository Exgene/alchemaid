<script>
	import AuthButton from '$lib/components/Auth/AuthButton.svelte';
	import Footer from '$lib/components/HeaderFooter/Footer.svelte';
	import ThemeToggle from '$lib/components/HeaderFooter/ThemeToggle.svelte';
</script>

<nav class="z-50 block h-20 w-full">
	<div class="flex h-full items-center justify-between px-10">
		<a href="/"><img src="/assets/logo.png" alt="Alchemaid logo" class="w-20 brightness-125 contrast-125" /></a>
		<div class="flex gap-2">
			<ThemeToggle />
			<AuthButton />
		</div>
	</div>
</nav>

<div class="min-h-[88vh]">
	<slot />
</div>

<Footer></Footer>
