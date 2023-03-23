<script lang="ts">
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { formatDate } from '$lib/utils';

	export let story: number;

	let storyData: Story;

	const loadStoryData = async (storyId: number): Promise<void> => {
		const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
		if (!storyRes.ok) {
			throw error(storyRes.status, 'Something went wrong fetching a story from Hacker News');
		}
		storyData = await storyRes.json();
	};

	type Story = {
		by: string;
		descendants: number;
		id: number;
		kids: number[];
		score: number;
		time: number;
		title: string;
		type: string;
		url: string;
	};

	onMount(() => {
		loadStoryData(story);
	});
</script>

<div class="post">
	{#if storyData}
		<div class="post-header">
			<a href={storyData.url} class="post-title" target="_blank" rel="noreferrer"
				>{storyData.title}</a
			>
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
			<span class={`story-type ${storyData.type}`}>{storyData.type}</span>
		</div>
		<div class="post-info">
			<a
				href={`https://news.ycombinator.com/user?id=${storyData.by}`}
				target="_blank"
				rel="noreferrer"
			>
				by {storyData.by}</a
			>
			• {storyData.score}
			points •
			<a href={`/hackernews/${storyData.id}`} target="_blank" rel="noreferrer"
				>{storyData.descendants || '0'} comments</a
			>
			• {formatDate(storyData.time)}
		</div>
	{/if}
</div>

<style>
	@media (max-width: 950px) {
		.post {
			font-size: smaller;
			width: 90%;
		}
	}
	.post-title {
		font-size: large;
		font-weight: bold;
		color: var(--aurora-4);
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
</style>
