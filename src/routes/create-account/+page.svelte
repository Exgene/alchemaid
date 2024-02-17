<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthCheck from '$lib/components/Auth/AuthCheck.svelte';

	import { Button } from '$lib/components/ui/custom_button';
	import * as Card from '$lib/components/ui/card';

	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';

	import { db, user, userData } from '$lib/firebase/firebase';
	import { doc, collection, getDoc, setDoc, writeBatch } from 'firebase/firestore';

	import { page } from '$app/stores';
	let redirect = $page.url.searchParams.get('redirect') ?? '';

	let name = '';
	let usn = '';
	let username = '';
	let phone = '';
	let loading = false;
	let isAvailable = false;

	const reUsername = /^(?=[a-z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	const reName = /(^[a-zA-Z][a-zA-Z\s]{0,48}[a-zA-Z]$)/;
	const rePhone = /^[0-9]{10}$/;

	$: isValidPhone = phone?.length === 10 && rePhone.test(phone);
	$: isTouchedPhone = phone.length >= 1;

	$: isValidName = name?.length > 4 && name.length < 48 && reName.test(name);
	$: isTouchedName = name.length >= 1;

	$: isValidUsername = username?.length > 2 && username.length < 16 && reUsername.test(username);
	$: isTouchedUsername = username.length >= 1;
	$: isTakenUsername = isValidUsername && !isAvailable && !loading;

	let debounceTimer: NodeJS.Timeout;

	async function checkAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);

		loading = true;

		if (!isTouchedUsername || !isValidUsername) {
			return;
		}

		// We are resetting the setTimeout using debounce such that this function only executes
		// when the user has stopped typing for a certain amount of time (500ms)
		// ps. this is to prevent unnecessary document reads in FireStore
		// without it, the function would run on every keypress
		debounceTimer = setTimeout(async () => {
			console.log('checking availability of', username);

			// We are making a reference to a document in FireStore in the
			// "usernames" collection where doc id = username
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	}

	async function createAccount() {
		if (isValidName && isValidUsername) {
			console.log('confirming username', username);

			const batch = writeBatch(db);

			// Create a new user document with an auto generated id
			const newUserRef = doc(collection(db, 'user'));
			batch.set(newUserRef, {
				username: username,
				email: $user?.providerData[0].email,
				name: name,
				isDoctor: false,
				createdAt: new Date().toISOString()
			});

			// Add the user to the auth collection
			batch.set(doc(db, 'auth', $user!.uid), { user: newUserRef.id });

			// Username is unique, so we are using it as the document id
			batch.set(doc(db, 'usernames', username), { user: newUserRef.id });

			// Create temporary profile
			batch.set(doc(db, 'profile', newUserRef.id), {
				name: name,
				username: username,
				photoURL: $user!.photoURL,
				bio: 'Hello! I am ' + name + '.',
				createdAt: new Date().toISOString()
			});

			// Create temporary private profile
			batch.set(doc(db, 'private', newUserRef.id), {
				name: name,
				phone: isValidPhone ? phone : '',
				email: $user?.providerData[0].email,
				username: username
			});

			await batch.commit();

			username = '';
			isAvailable = false;
		} else {
			alert('Please enter valid details');
		}
	}
</script>

<AuthCheck>
	{#if $userData !== null}
		{#if redirect !== ''}
			{goto(redirect)}
		{:else}
			{goto('/' + $userData.username + '/edit')}
			<!-- {goto('/')} -->
		{/if}
	{:else if $user}
		<div class="m-2 flex min-h-screen items-center justify-center">
			<Card.Root class="max-w-2xl">
				<Card.Header class="space-y-1">
					<Card.Title class="text-3xl">Enter your details</Card.Title>
					<h2 class="card-title">Welcome, {$user.displayName}</h2>
					<Card.Description>You have successfully signed in. Now you can enter your details. Make sure to enter all your details correctly.</Card.Description>
				</Card.Header>

				<form on:submit|preventDefault={createAccount}>
					<Card.Content>
						<div>
							<Label class="text-xl" for="name">Name</Label>
							<Input type="text" id="name" placeholder="Enter your full name" bind:value={name} class={!isValidName && isTouchedName ? 'bg-red-200 dark:bg-red-900' : ''} required />
							{#if isTouchedName && !isValidName}
								<div>
									<p>The name you have entered is invalid.</p>
									<p class="text-sm text-muted-foreground">Your name must begin with a Capital letter and shouldn't begin or end with a space.</p>
								</div>
							{/if}
						</div>

						<div class="mt-6">
							<Label for="username" class="mt-10 text-xl">Username</Label>
							<Input type="text" class="{!isValidUsername && isTouchedUsername ? 'bg-red-200 dark:bg-red-900' : ''} {isTakenUsername ? 'bg-yellow-200 dark:bg-yellow-700' : ''} {isAvailable && isValidUsername && !loading ? 'bg-green-300 dark:bg-green-800' : ''}" id="username" placeholder="Enter a username" bind:value={username} on:input={checkAvailability} required />
							<p class="mt-1 text-sm text-muted-foreground">Your username is public and is used to access your profile page.</p>

							{#if isTouchedUsername}
								<div class="mt-4">
									{#if loading}
										<p>Checking availability of @{username}...</p>
									{/if}

									{#if !isValidUsername && isTouchedUsername}
										<p class="mt-1 text-sm text-muted-foreground">Username must be 3-16 characters long and alphanumeric (small letters only)</p>
									{/if}

									{#if isValidUsername && !isAvailable && !loading}
										<p>
											@{username} is not available
										</p>
									{/if}

									{#if isValidUsername && isAvailable}
										<p class="text-green-500">@{username} is available</p>
									{/if}
								</div>
							{/if}
						</div>

						<div class="mt-6">
							<Label for="phone" class="mt-10 text-xl">Phone Number</Label>
							<Input type="text" class="{!isValidPhone && isTouchedPhone ? 'bg-red-200 dark:bg-red-900' : ''} {isValidPhone ? 'bg-green-300 dark:bg-green-800' : ''}" id="phone" placeholder="Enter your Phone Number" bind:value={phone} required />

							{#if isTouchedPhone && !isValidPhone}
								<div>
									<p>Write your number as 10 digits with no other characters</p>
								</div>
							{/if}

							<p class="mt-1 text-sm text-muted-foreground">You can also change the number in your account settings.</p>
						</div>
					</Card.Content>

					<Card.Footer>
						<Button class="w-full" type="submit">Submit</Button>
					</Card.Footer>
				</form>
			</Card.Root>
		</div>
	{/if}
</AuthCheck>
