<script>
	import { user, userData } from '$lib/firebase/firebase';
	import * as Card from '$lib/components/ui/card';
</script>

<main class="flex min-h-[100svh] w-full items-center justify-center py-10">
	<img src="assets/homepage.jpeg" alt="Landing Page" class="hidden md:block" />
	<img src="assets/homepageMobile.jpeg" alt="Landing Page" class="mt-[5vh] md:hidden" />
	<!-- <div class="absolute bottom-0 flex h-[92svh] flex-col items-center justify-center">
		<div class="flex h-[90%] w-11/12 flex-col justify-around rounded-3xl bg-gradient-to-br from-green-500 to-green-700 px-4 py-8 md:mx-0 md:w-full md:max-w-[90vw] md:flex-row md:px-16">
			<img src="/assets/centerGraphic.png" alt="hero" />
			<div class="flex flex-col items-center justify-center">
				<h1 class="text-center text-[1.5rem] font-bold text-white md:text-[4rem]">Revolutionizing Healthcare</h1>
				<div class="h-3"></div>
				<span class="text-md bg-blur-2xl flex w-fit justify-center rounded-2xl bg-green-900 bg-opacity-30 px-4 py-2 text-center font-semibold text-white"> AI Foresees Diseases in Medical Scans </span>
				<p class="text-md max-w-3xl pt-4 text-center text-white md:w-[32rem] md:pt-6">Upload X-rays, MRIs, CT Scans, and More. Let Our AI Predict Diseases for Informed Healthcare Decisions and Better Outcomes</p>
				{#if $user && $userData}
					<a class="mt-8 w-fit rounded-2xl bg-white px-6 py-2 text-xl font-semibold duration-300 hover:scale-110 md:px-12 md:py-4 md:text-3xl" href="/dashboard"> Try It Out! </a>
				{:else}
					<a class="mt-8 w-fit rounded-2xl bg-white px-6 py-2 text-xl font-semibold duration-300 hover:scale-110 md:px-12 md:py-4 md:text-3xl" href="/signup"> Try It Out! </a>
				{/if}
			</div>
		</div>
	</div> -->
</main>
