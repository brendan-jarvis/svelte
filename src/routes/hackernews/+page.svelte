<script lang="ts">
	export let data;

	const { topStories } = data;
</script>

<div class="container">
	<h1>Hackernews</h1>
	<ul>
		{#each topStories as story}
			<li>
				<a href={`https://news.ycombinator.com/item?id=${story}`}>{story}</a>
			</li>
		{/each}
	</ul>
</div>

<svelte:head>
	<title>Hackernews - Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<style>
	h1 {
		text-align: center;
	}
</style>
