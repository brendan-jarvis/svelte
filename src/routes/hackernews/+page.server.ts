import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const fetchStories = async (url: string) => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/${url}.json?print=pretty`);
		const storyIds = await res.json();

		const fiftyStories = storyIds.slice(0, 50);

		if (!res.ok) {
			throw error(res.status, `Something went wrong fetching stories from Hacker News: ${url}`);
		}

		const storyDataPromises = fiftyStories.map(async (story: string) => {
			const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`);
			if (!storyRes.ok) {
				throw error(storyRes.status, 'Something went wrong fetching a story from Hacker News');
			}
			return storyRes.json();
		});

		const storyData = await Promise.all(storyDataPromises);

		return storyData;
	};

	return {
		topStories: fetchStories('topstories'),
		bestStories: fetchStories('beststories'),
		newStories: fetchStories('newstories')
	};
}) satisfies PageServerLoad;
