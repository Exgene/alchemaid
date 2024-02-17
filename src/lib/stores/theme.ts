import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Dark & light theme store
type DarkTheme = boolean;

const getTheme = () => {
	if (browser) {
		return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
	} else {
		return false;
	}
};

function createDarkTheme() {
	const { subscribe, set, update } = writable<DarkTheme>(getTheme());

	return {
		subscribe,
		set,
		toggle: () => {
			update((x) => !x);
		}
	};
}

export const darkTheme = createDarkTheme();

darkTheme.subscribe((value) => {
	if (browser) {
		value ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', value ? 'dark' : 'light');
	}
});
