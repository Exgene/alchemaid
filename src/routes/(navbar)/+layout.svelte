<script>
	import AuthButton from '$lib/components/Auth/AuthButton.svelte';
	import Footer from '$lib/components/HeaderFooter/Footer.svelte';
	import Navbar from '$lib/components/HeaderFooter/Navbar.svelte';
</script>

<Navbar />
<slot />
<Footer />
