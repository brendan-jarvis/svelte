<script lang="ts">
	export let data;

	const { topStories } = data;
</script>

<div class="container">
	<h1>Hackernews</h1>
	<h2>Top Stories</h2>
	<div class="posts">
		{#each topStories as story}
			<div class="post">
				<div class="post-header">
					<a href={story.url} class="post-title">{story.title} </a>
				</div>
				<div class="post-info">
					<a href={`https://news.ycombinator.com/user?id=${story.by}`}> by {story.by}</a> • {story.score}
					points •
					<a href={`https://news.ycombinator.com/item?id=${story.id}`}
						>{story.descendants} comments</a
					>
					• {new Date(story.time).toLocaleDateString('en-NZ', {
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

	.post {
		margin-bottom: 1rem;
	}

	.post-title {
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--frost-1);
	}
</style>
