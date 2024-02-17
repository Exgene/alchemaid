<script>
	import * as Card from '$lib/components/ui/card';
	const doctors = [
		{ name: 'Dr. Ema Williams', speciality: 'Psychologist' },
		{ name: 'Dr. Ayush Chaudhary', speciality: 'Cardiologist' },
		{ name: 'Dr. Narasimha', speciality: 'Gynacologist' },
		{ name: 'Dr. Nandan Upadhyaya', speciality: 'Dentist' }
	];
</script>

<main class="min-h-[92dvh] p-4">
	<h1 class="w-full text-center text-2xl font-bold">Available Doctors</h1>
	<div class="h m-auto mt-4 grid max-w-lg grid-cols-2 justify-center gap-2">
		{#each doctors as doctor, i}
			<Card.Root class="h-50">
				<img src={`/assets/doc${i + 1}.jpg`} class="h-[66%] w-max rounded-t-lg object-cover" alt="doc" />
				<Card.Header>
					<Card.Title>{doctor.name}</Card.Title>
					<Card.Description>{doctor.speciality}</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>

	<!-- <h1 class="mt-4 w-full text-center text-2xl font-bold">Find Doctors near you</h1> -->
</main>
