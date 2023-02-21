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

	console.log(storyData.kids);

	const commentDataPromises = storyData.kids.map(async (comment: string) => {
		const commentRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`);

		if (!commentRes.ok) {
			throw error(commentRes.status, 'Something went wrong fetching a story from Hacker News');
		}

		return commentRes.json();
	});

	if (!params) {
		throw error(404, 'No story found.');
	}

	return {
		storyData,
		commentData: await Promise.all(commentDataPromises)
	};
}) satisfies PageLoad;
