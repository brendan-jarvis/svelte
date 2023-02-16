import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const fetchTopPosts = async () => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
		const topStories = await res.json();

		if (!res.ok) {
			throw error(res.status, 'Something went wrong fetching top stories from Hacker News');
		}

		const storyDataPromises = topStories.map(async (story: string) => {
			const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`);
			if (!storyRes.ok) {
				throw error(storyRes.status, 'Something went wrong fetching a story from Hacker News');
			}
			return storyRes.json();
		});

		const storyData = await Promise.all(storyDataPromises);

		return storyData;
	};

	const fetchBestPosts = async () => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`);
		const bestStories = await res.json();

		if (!res.ok) {
			throw error(res.status, 'Something went wrong fetching best stories from Hacker News');
		}

		const storyDataPromises = bestStories.map(async (story: string) => {
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
		topStories: fetchTopPosts(),
		bestStories: fetchBestPosts()
	};
}) satisfies PageLoad;
