import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const storyRes = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${params.post}.json?print=pretty`
	);
	const storyData = await storyRes.json();

	if (!storyRes.ok) {
		throw error(storyRes.status, 'Something went wrong fetching a story from Hacker News');
	}

	if (!params) {
		throw error(404, 'No story found.');
	}

	return {
		storyData
	};
}) satisfies PageLoad;
