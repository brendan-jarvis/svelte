<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import Comment from './Comment.svelte';

	import { formatDate } from '$lib/utils';

	export let data: PageData;
	const { storyData, commentData } = data;
</script>

<svelte:head>
	<title>{storyData.title} Hackernews Viewer - by Brendan Jarvis</title>
	<meta name="description" content="Hackernews viewer built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="comments-container" in:fade={{ delay: 250 }}>
	<div class="story-header">
		<h2><a href={storyData.url}>{storyData.title}</a></h2>
		{#if storyData.url}
			<span class="story-url"
				>(<a
					href={`https://news.ycombinator.com/from?site=${
						storyData.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
					}`}
					target="_blank"
					rel="noreferrer"
					>{storyData.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
				>)</span
			>
		{/if}
	</div>
	<div class="story-info">
		<p>
			{storyData.score} points by
			<a href={`https://news.ycombinator.com/user?id=${storyData.by}`}>{storyData.by}</a>
			{formatDate(storyData.time)} | {storyData.descendants} comments
		</p>
	</div>

	<div class="comments">
		<h3>Comments</h3>
		{#each commentData as comment}
			<Comment {comment} />
		{/each}
	</div>
</div>

<style>
	h2 a {
		color: var(--aurora-2);
	}

	.story-header {
		align-items: baseline;
		gap: 0.5rem;
	}

	.story-url {
		font-size: 0.8rem;
	}

	.story-info {
		margin-bottom: 1rem;
	}
</style>
