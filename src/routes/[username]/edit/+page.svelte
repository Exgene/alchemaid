<script lang="ts">
	import { page } from '$app/stores';
	import { backgroundColor } from '$lib/actions/style';
	import UpdateBio from '$lib/components/Profile/UpdateBio.svelte';
	import UpdateColor from '$lib/components/Profile/UpdateColor.svelte';
	import UpdateLinks from '$lib/components/Profile/UpdateLinks.svelte';
	import UpdatePhone from '$lib/components/Profile/UpdatePhone.svelte';
	import UpdatePhoto from '$lib/components/Profile/UpdatePhoto.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { userData, userProfileData } from '$lib/firebase/firebase';
	import { darkTheme } from '$lib/stores/theme';
</script>

<svelte:body
	use:backgroundColor={{
		color_light: $userProfileData?.color_light ?? '',
		color_dark: $userProfileData?.color_dark ?? '',
		darkTheme: $darkTheme
	}}
/>

{#if $userData?.username == $page.params.username}
	<section class="relative my-4 flex w-full justify-center px-2 sm:px-0">
		<div class="custom-shadow-black dark:custom-shadow-white mx-auto flex flex-1 flex-col gap-x-8 rounded-2xl border border-primary bg-primary bg-opacity-5 p-10 text-center md:mx-4 md:max-w-6xl lg:flex-row">
			<div class=" lg:w-1/2">
				<UpdatePhoto />
				<Separator class="my-4 bg-slate-500 dark:bg-muted" />
				<UpdatePhone />
				<Separator class="my-8 bg-slate-500 dark:bg-muted sm:hidden" />
			</div>
			<div class="lg:w-1/2">
				<UpdateColor />
				<Separator class="mb-4 mt-12 bg-slate-500 dark:bg-muted" />
				<UpdateBio />
				<Separator class="my-8 bg-slate-500 dark:bg-muted sm:hidden" />
			</div>
			<div class="lg:w-1/2">
				<UpdateLinks />
			</div>
		</div>
	</section>
{:else}
	You aren't authorized to edit this profile
{/if}
