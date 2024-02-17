if (localStorage.getItem('theme') === 'dark') {
	document.documentElement.classList.add('dark');
} else if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}
