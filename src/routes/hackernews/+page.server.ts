import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	// TODO: Learn how to handle Supabase session in SvelteKit
	const fetchStories = async (url: string) => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/${url}.json?print=pretty`);
		const storyIds = await res.json();

		if (!res.ok) {
			throw error(res.status, `Something went wrong fetching stories from Hacker News: ${url}`);
		}

		const storyData = await Promise.all(storyIds);

		return storyData;
	};

	return {
		topStories: fetchStories('topstories'),
		bestStories: fetchStories('beststories'),
		newStories: fetchStories('newstories'),
		session: null
	};
}) satisfies PageServerLoad;
