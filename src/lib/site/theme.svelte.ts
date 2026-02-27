let dark = $state(false);

if (typeof window !== 'undefined') {
	dark =
		localStorage.getItem('theme') === 'dark' ||
		(!localStorage.getItem('theme') &&
			window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export const theme = {
	get dark() {
		return dark;
	},
	toggle() {
		dark = !dark;
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
			document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		}
	},
	init() {
		if (typeof window !== 'undefined') {
			document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		}
	}
};
