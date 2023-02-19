<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { topStories, bestStories, newStories } = data;
	$: stories = [
		{
			title: 'Top Stories',
			data: topStories
		},
		{
			title: 'Best Stories',
			data: bestStories
		},
		{
			title: 'New Stories',
			data: newStories
		}
	];
	let sort: string;

	const formatDate = (timestamp: number): string => {
		const date = new Date(timestamp * 1000);
		const now = new Date();
		const diff = (now.getTime() - date.getTime()) / 1000; // time difference in seconds
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		if (diff < 3600) {
			// less than 60 minutes ago
			const minutes = Math.floor(diff / 60);
			if (minutes === 1) {
				return `${minutes} minute ago`;
			}
			return `${minutes} minutes ago`;
		} else if (diff < 86400) {
			// less than 24 hours ago
			const hours = Math.floor(diff / 3600);
			if (hours === 1) {
				return `${hours} hour ago`;
			}
			return `${hours} hours ago`;
		} else {
			// more than 24 hours ago
			return date.toLocaleDateString('en-NZ', options);
		}
	};

	const pointsSort = () => {
		if (sort === 'points' || sort === 'points-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'points' ? 'points-reverse' : 'points';

			return;
		}

		topStories = topStories.sort((a, b) => b.score - a.score);
		bestStories = bestStories.sort((a, b) => b.score - a.score);
		newStories = newStories.sort((a, b) => b.score - a.score);

		sort = 'points';
	};

	const commentsSort = () => {
		if (sort === 'comments' || sort === 'comments-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'comments' ? 'comments-reverse' : 'comments';

			return;
		}

		topStories = topStories.sort((a, b) => b.descendants - a.descendants);
		bestStories = bestStories.sort((a, b) => b.descendants - a.descendants);
		newStories = newStories.sort((a, b) => b.descendants - a.descendants);

		sort = 'comments';
	};

	const dateSort = () => {
		if (sort === 'date' || sort === 'date-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'date' ? 'date-reverse' : 'date';

			return;
		}

		topStories = topStories.sort((a, b) => b.time - a.time);
		bestStories = bestStories.sort((a, b) => b.time - a.time);
		newStories = newStories.sort((a, b) => b.time - a.time);

		sort = 'date';
	};

	$: topStories = topStories;
	$: bestStories = bestStories;
	$: newStories = newStories;
</script>

<h1>Hackernews</h1>
<label
	>Sort by:
	<button value="points" on:click={pointsSort}
		>Points{#if sort === 'points'}▼{/if}{#if sort === 'points-reverse'}▲{/if}</button
	>
	<button value="comments" on:click={commentsSort}
		>Comments{#if sort === 'comments'}▼{/if}{#if sort === 'comments-reverse'}▲{/if}</button
	>
	<button value="date" on:click={dateSort}
		>Date posted{#if sort === 'date'}▼{/if}{#if sort === 'date-reverse'}▲{/if}</button
	>
</label>
<div class="container">
	{#each stories as post (post)}
		<div class="posts">
			<h2>{post.title}</h2>
			{#each post.data as story (story)}
				<div class="post">
					<div class="post-header">
						<a href={story.url} class="post-title">{story.title}</a>
						<span class="story-url"
							>(<a
								href={`https://news.ycombinator.com/from?site=${
									story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
								}`}>{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
							>)</span
						>
						<span class={`story-type ${story.type}`}>{story.type}</span>
					</div>
					<div class="post-info">
						<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
						points •
						<a href={`https://news.ycombinator.com/item?id=${story.id}`}
							>{story.descendants || '0'} comments</a
						>
						• {formatDate(story.time)}
					</div>
				</div>
			{/each}
		</div>
	{/each}

	<!-- <h2>Top Stories</h2>
		{#each topStories as story (story)}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class="story-url"
						>(<a
							href={`https://news.ycombinator.com/from?site=${
								story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
							}`}>{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
						>)</span
					>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {formatDate(story.time)}
				</div>
			</div>
		{/each}
	</div>
	<div class="posts">
		<h2>Best Posts</h2>
		{#each bestStories as story (story)}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class="story-url"
						>(<a
							href={`https://news.ycombinator.com/from?site=${
								story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
							}`}>{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
						>)</span
					>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {formatDate(story.time)}
				</div>
			</div>
		{/each}
	</div>
	<div class="posts">
		<h2>New Posts</h2>
		{#each newStories as story (story)}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class="story-url"
						>(<a
							href={`https://news.ycombinator.com/from?site=${
								story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
							}`}>{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
						>)</span
					>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {formatDate(story.time)}
				</div>
			</div>
		{/each}
	</div> -->
</div>

<svelte:head>
	<title>Hackernews - Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<style>
	h1 {
		text-align: center;
	}

	label {
		display: flex;
		justify-content: center;
		align-items: baseline;
		font-size: larger;
		gap: 1rem;
	}

	label button {
		background-color: var(--aurora-3);
		color: var(--polar-night-1);
		font-size: 1rem;
		font-weight: bold;
		border: none;
		border-radius: 0.2rem;
		padding: 0.3rem;
		cursor: pointer;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
	}

	.post {
		margin-bottom: 1rem;
	}

	.story-type {
		text-transform: capitalize;
		color: var(--polar-night-1);
		font-size: smaller;
		padding: 0.2rem;
		border-radius: 0.2rem;
	}

	.job {
		background-color: var(--aurora-1);
	}

	.story {
		background-color: var(--aurora-2);
	}

	.comment {
		background-color: var(--aurora-3);
	}

	.poll {
		background-color: var(--aurora-4);
	}

	.pollopt {
		background-color: var(--aurora-5);
	}

	.post-title {
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--aurora-4);
	}
</style>
