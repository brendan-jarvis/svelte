<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { topStories, bestStories, newStories } = data;
	let sort: string;

	const pointsSort = () => {
		topStories = topStories.slice().sort((a, b) => b.score - a.score);
		bestStories = bestStories.slice().sort((a, b) => b.score - a.score);
		newStories = newStories.slice().sort((a, b) => b.score - a.score);

		sort = 'points';
	};

	const commentsSort = () => {
		topStories = topStories.slice().sort((a, b) => b.descendants - a.descendants);
		bestStories = bestStories.slice().sort((a, b) => b.descendants - a.descendants);
		newStories = newStories.slice().sort((a, b) => b.descendants - a.descendants);

		sort = 'comments';
	};

	const dateSort = () => {
		if (sort === 'date') {
			topStories = topStories.slice().sort((a, b) => a.time - b.time);
			bestStories = bestStories.slice().sort((a, b) => a.time - b.time);
			newStories = newStories.slice().sort((a, b) => a.time - b.time);
			sort = 'date-reverse';
			return;
		}

		topStories = topStories.slice().sort((a, b) => b.time - a.time);
		bestStories = bestStories.slice().sort((a, b) => b.time - a.time);
		newStories = newStories.slice().sort((a, b) => b.time - a.time);

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
		>Points{#if sort === 'points'}↓{/if}{#if sort === 'points-reverse'}↑{/if}</button
	>
	<button value="comments" on:click={commentsSort}
		>Comments{#if sort === 'comments'}↓{/if}{#if sort === 'comments-reverse'}↑{/if}</button
	>
	<button value="date" on:click={dateSort}
		>Date posted{#if sort === 'date'}↓{/if}{#if sort === 'date-reverse'}↑{/if}</button
	>
</label>
<div class="container">
	<div class="posts">
		<h2>Top Stories</h2>
		{#each topStories as story (story)}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {new Date(story.time * 1000).toLocaleDateString('en-NZ', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
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
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {new Date(story.time * 1000).toLocaleDateString('en-NZ', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
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
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants || '0'} comments</a
					>
					• {new Date(story.time * 1000).toLocaleDateString('en-NZ', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
			</div>
		{/each}
	</div>
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
		display: flex;
		flex-direction: row;
	}

	.post {
		flex: 1;
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
		color: var(--frost-1);
	}
</style>
