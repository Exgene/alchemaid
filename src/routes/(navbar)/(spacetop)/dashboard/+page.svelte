<script>
	import UserDashboard from './userDashboard.svelte';
	import {userData} from '$lib/firebase/firebase'
	import DoctorDashboard from './doctorDashboard.svelte';
</script>

{#if $userData?.isDoctor}
<DoctorDashboard />
{:else}
<UserDashboard />
{/if}