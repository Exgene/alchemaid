import { darkTheme } from '$lib/stores/theme';

/** @type {import('svelte/action').Action<HTMLElement, string>}  */
export function backgroundColor(node: HTMLElement, color: { color_light: string; color_dark: string; darkTheme: boolean }) {
	node.style['background-color'] = color.darkTheme ? color.color_dark : color.color_light;
	return {
		update(color: { color_light: string; color_dark: string; darkTheme: boolean }) {
			node.style['background-color'] = color.darkTheme ? color.color_dark : color.color_light;
		},
		destroy() {
			node.style['background-color'] = '';
		}
	};
}
