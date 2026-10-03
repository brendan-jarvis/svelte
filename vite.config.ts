import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations#preprocessors
			// for more information about preprocessors
			preprocess: vitePreprocess(),
			adapter: adapter(),
			// /blog/[id] is only crawled when the homepage has posts. An empty
			// Supabase response used to still produce a build.
			prerender: {
				handleUnseenRoutes: 'warn'
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		passWithNoTests: true
	}
});
