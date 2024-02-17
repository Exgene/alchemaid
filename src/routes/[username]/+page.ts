import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase/firebase';
import { error } from '@sveltejs/kit';
import type { ProfileData } from '$lib/types/ProfileData';

export const load = (async ({ params }) => {
	const userCollectionRef = collection(db, 'user');
	const profileCollectionRef = collection(db, 'profile');

	const q = query(userCollectionRef, where('username', '==', params.username), limit(1));
	const q2 = query(profileCollectionRef, where('username', '==', params.username), limit(1));

	const [snapshot, profileSnapshot] = await Promise.all([getDocs(q), getDocs(q2)]);

	const exists = snapshot.docs[0]?.exists() && profileSnapshot.docs[0]?.exists();
	if (!exists) {
		error(404, params.username + ' username does not exist!');
	}

	const userData = snapshot.docs[0]?.data();
	const profileData = profileSnapshot.docs[0]?.data() as ProfileData;

	// if (!data.published) {
	// 	throw error(403, `The profile of @${data.username} is not public!`);
	// }

	return {
		...userData,
		...profileData
	} as ProfileData;
}) satisfies PageLoad;
