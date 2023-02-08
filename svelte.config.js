import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { BYPASS_TOKEN } from '$env/static/private';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	},

	isr: {
		// Expiration time (in seconds) before the cached asset will be re-generated by invoking the Serverless Function.
		// Setting the value to `false` means it will never expire.
		expiration: 60,

		// Option group number of the asset. Assets with the same group number will all be re-validated at the same time.
		group: 1,

		// Random token that can be provided in the URL to bypass the cached version of the asset, by requesting the asset
		// with a __prerender_bypass=<token> cookie.
		//
		// Making a `GET` or `HEAD` request with `x-prerender-revalidate: <token>` will force the asset to be re-validated.
		bypassToken: BYPASS_TOKEN,

		// List of query string parameter names that will be cached independently.
		// If an empty array, query values are not considered for caching.
		// If `undefined` each unique query value is cached independently
		allowQuery: ['search']
	}
};

export default config;
