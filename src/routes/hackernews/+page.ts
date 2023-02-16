import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const fetchTopPosts = async () => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
		const topStories = await res.json();

		const topFiftyStories = topStories.slice(0, 50);

		if (!res.ok) {
			throw error(res.status, 'Something went wrong fetching top stories from Hacker News');
		}

		const storyDataPromises = topFiftyStories.map(async (story: string) => {
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

		const fiftyBestStories = bestStories.slice(0, 50);

		if (!res.ok) {
			throw error(res.status, 'Something went wrong fetching best stories from Hacker News');
		}

		const storyDataPromises = fiftyBestStories.map(async (story: string) => {
			const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`);
			if (!storyRes.ok) {
				throw error(storyRes.status, 'Something went wrong fetching a story from Hacker News');
			}
			return storyRes.json();
		});

		const storyData = await Promise.all(storyDataPromises);

		return storyData;
	};

	const fetchNewPosts = async () => {
		const res = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`);
		const newStories = await res.json();

		const fiftyNewStories = newStories.slice(0, 50);

		if (!res.ok) {
			throw error(res.status, 'Something went wrong fetching new stories from Hacker News');
		}

		const storyDataPromises = fiftyNewStories.map(async (story: string) => {
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
		bestStories: fetchBestPosts(),
		newStories: fetchNewPosts()
	};
}) satisfies PageLoad;
