<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { topStories, bestStories, newStories } = data;

	console.log(newStories);
</script>

<h1>Hackernews</h1>
<div class="container">
	<div class="posts">
		<h2>Top Stories</h2>
		{#each topStories as story}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants} comments</a
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
		{#each bestStories as story}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title}</a>
					<span class={`story-type ${story.type}`}>{story.type}</span>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants} comments</a
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
