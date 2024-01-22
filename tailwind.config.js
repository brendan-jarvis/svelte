/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'polar-night-1': '#2e3440',
				'polar-night-2': '#3b4252',
				'polar-night-3': '#434c5e',
				'polar-night-4': '#4c566a',

				'snow-storm-1': '#d8dee9',
				'snow-storm-2': '#e5e9f0',
				'snow-storm-3': '#eceff4',

				'frost-1': '#8fbcbb',
				'frost-2': '#88c0d0',
				'frost-3': '#81a1c1',
				'frost-4': '#5e81ac',

				'aurora-1': '#bf616a',
				'aurora-2': '#d08770',
				'aurora-3': '#ebcb8b',
				'aurora-4': '#a3be8c',
				'aurora-5': '#b48ead'
			}
		}
	},
	plugins: []
};
