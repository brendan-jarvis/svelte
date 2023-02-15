export const load = async () => {
	const fetchTopPosts = async () => {
		const res = await fetch(
			`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
		);
		const topStories = await res.json();

		if (!res.ok) {
			throw new Error('Something went wrong fetching top stories from Hacker News');
		}

		return topStories;
	};

	return {
		topStories: fetchTopPosts()
	};
};
