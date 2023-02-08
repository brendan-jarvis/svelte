import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET = (async () => {
	const response = await fetch(
		`https://api.thecatapi.com/v1/images/search?api_key=${env.PRIVATE_CAT_API_KEY}`
	);
	const cat = await response.json();

	if (!cat) {
		throw error(500, 'Unable to fetch cat');
	}

	return json(cat[0]);
}) satisfies RequestHandler;
