<script>
	import { onMount } from "svelte";

    let x = false;

    onMount(() => {
        x = true;
    })
    import Navbar from "$lib/components/HeaderFooter/Navbar2.svelte";
</script>

{#if x}
<Navbar/>
<div class="w-full h-fit"><iframe src="https://aido-clone.vercel.app/query" width={window.innerWidth} height={window.innerHeight} title='Chatbot' frameborder="0"></iframe></div>

{/if}
