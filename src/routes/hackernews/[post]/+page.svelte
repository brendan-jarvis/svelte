<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Comment from './Comment.svelte';

	import { formatDate } from '../../../lib/utils';

	export let data: PageData;
	const { storyData, commentData } = data;
	const { post } = $page.params;
</script>

<svelte:head>
	<title>{storyData.title} Hackernews Viewer - by Brendan Jarvis</title>
	<meta name="description" content="Hackernews viewer built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="container" in:fade={{ delay: 250 }}>
	<div class="story-header">
		<h2>{storyData.title}</h2>
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
	</div>
	<div class="story-info">
		<p>
			{storyData.score} points by {storyData.by}
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
	@media (max-width: 950px) {
		/* .comments {
			width: 100%;
		} */
	}
	@media (min-width: 950px) {
		/* .comments {
			width: 100%;
		} */
	}

	.story-header {
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
		gap: 0.5rem;
	}

	.story-url {
		font-size: 0.8rem;
	}

	.story-info {
		margin-bottom: 1rem;
	}

	.comments {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
		padding: 0.5rem;
	}
</style>
