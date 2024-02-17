<script>
	import AuthButton from '$lib/components/Auth/AuthButton.svelte';
	import ThemeToggle from '$lib/components/HeaderFooter/ThemeToggle.svelte';
	import { NAVITEM } from '$lib/data/NavbarItems';

	let y = 0;
	let sidebar = false;
	const closeMenu = () => {
		sidebar = false;
	};
</script>

<svelte:window bind:scrollY={y} />

<div class="z-50">
	<!-- Desktop Navbar -->
	<div class="fixed top-0 z-50 hidden w-full md:grid">
		<div class={`md: flex items-center justify-center px-6 py-2 md:px-10 md:py-6 ${y > 0 ? 'backdrop-blur-xl' : ''} transition-all duration-150 ease-out`}>
			<div class="absolute left-6 flex items-center gap-x-2">
				<a href="/"><img src="/assets/logo.png" alt="Alchemaid logo" class="w-20 brightness-125 contrast-125" /></a>
			</div>
			<ul class="flex flex-wrap items-center space-x-6 md:text-lg">
				{#each NAVITEM as nav}
					<div class="hover:dark:custom-drop-shadow-white hover:scale-110"><a href={`${nav.href}`} class="scroll-smooth">{nav.title}</a></div>
				{/each}
			</ul>
			<div class="absolute right-10 flex w-28 justify-center gap-2">
				<ThemeToggle />
				<AuthButton />
			</div>
		</div>
	</div>

	<!-- Mobile Navbar -->
	<!-- ${y > 0 ? 'backdrop-blur-xl' : ''} -->
	<div class={`fixed z-50 flex w-full pb-2 pt-4  ${y > 0 ? 'backdrop-blur-xl' : ''} transition-all duration-150 ease-out md:hidden`}>
		<div class="flex">
			<div>
				<a href="/"><img src="/assets/logo.png" alt="Alchemaid logo" class="w-12 brightness-125 contrast-125 sm:w-20" /></a>
			</div>
		</div>
		<div class="absolute right-8 flex w-28 justify-center gap-2">
			<AuthButton />
		</div>
		<nav>
			<div id="menuToggle" class="py-6 pr-3">
				<input type="checkbox" bind:checked={sidebar} />
				<span class="bg-black dark:bg-white"></span>
				<span class="bg-black dark:bg-white"></span>
				<span class="bg-black dark:bg-white"></span>

				<ul id="menu" class="bg-white pr-4 text-right drop-shadow-xl backdrop-blur-xl dark:bg-slate-800">
					{#each NAVITEM as nav}
						<a class="mt-10 text-2xl" href={`${nav.href}`} on:click={closeMenu}> {nav.title} </a>
					{/each}
					<div class="mt-6 flex flex-col items-end gap-y-4 text-2xl">
						<div class="max-w-sm"><ThemeToggle /></div>
					</div>
				</ul>
			</div>
		</nav>
	</div>
</div>

<style>
	#menuToggle {
		display: block;
		z-index: 1;
		font-weight: bold;
		-webkit-user-select: none;
		user-select: none;
		position: absolute;
		right: 0;
		top: 0;
	}

	#menuToggle a {
		text-decoration: none;
		transition: color 0.3s ease;
	}

	#menuToggle a:hover {
		color: grey;
	}

	#menuToggle input {
		display: block;
		width: 40px;
		height: 32px;
		position: absolute;
		cursor: pointer;

		opacity: 0;
		z-index: 2;

		-webkit-touch-callout: none;
	}

	/*
  	* Just a quick hamburger
  	*/
	#menuToggle span {
		display: block;
		width: 33px;
		height: 4px;
		margin-bottom: 5px;
		position: relative;
		border-radius: 3px;

		z-index: 1;

		transform-origin: 4px 0px;

		transition:
			transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
			background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
			opacity 0.55s ease;
	}

	#menuToggle span:first-child {
		transform-origin: 0% 0%;
	}

	#menuToggle span:nth-last-child(2) {
		transform-origin: 0% 100%;
	}

	/* 
	* Transform all the slices of hamburger
	* into a crossmark.
	*/
	#menuToggle input:checked ~ span {
		opacity: 1;
		transform: rotate(45deg) translate(-2px, -1px);
	}

	/*
	* But let's hide the middle one.
	*/
	#menuToggle input:checked ~ span:nth-last-child(3) {
		opacity: 0;
		transform: rotate(0deg) scale(0.2, 0.2);
	}

	/*
	* Ohyeah and the last one should go the other direction
	*/
	#menuToggle input:checked ~ span:nth-last-child(2) {
		transform: rotate(-45deg) translate(0, -1px);
	}

	#menu {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 70vw;
		padding-top: 5rem;
		padding-right: 2rem;
		z-index: 0;
		top: 0;
		right: 0;
		height: 100vh;
		list-style-type: none;
		-webkit-font-smoothing: antialiased;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
		transform-origin: 0% 0%;
		transform: translate(103%, 0);
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
	}

	#menuToggle input:checked ~ ul {
		transform: none;
	}
</style>
