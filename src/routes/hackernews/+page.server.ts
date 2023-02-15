export const load = async () => {
	const fetchTopPosts = async () => {
		const res = await fetch(
			`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
		);
		const topStories = await res.json();

		if (!res.ok) {
			throw new Error('Something went wrong fetching top stories from Hacker News');
		}

    const storyDataPromises = topStories.map(async (story: string) => {
      const storyRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${story}.json`
      );
      if (!storyRes.ok) {
        throw new Error('Something went wrong fetching a story from Hacker News');
      }
      return storyRes.json();
    });

    const storyData = await Promise.all(storyDataPromises);

    return storyData;
	};

	return {
		topStories: fetchTopPosts()
	};
};
