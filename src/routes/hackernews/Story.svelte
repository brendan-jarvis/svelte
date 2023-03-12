<script lang="ts">
	export let story: Story;

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

	import { formatDate } from '$lib/utils';
</script>

<div class="post">
	<div class="post-header">
		<a href={story.url} class="post-title" target="_blank" rel="noreferrer">{story.title}</a>
		{#if story.url}
			<span class="story-url"
				>(<a
					href={`https://news.ycombinator.com/from?site=${
						story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
					}`}
					target="_blank"
					rel="noreferrer">{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
				>)</span
			>
		{/if}
		<span class={`story-type ${story.type}`}>{story.type}</span>
	</div>
	<div class="post-info">
		<a href={`https://news.ycombinator.com/user?id=${story.by}`} target="_blank" rel="noreferrer">
			by {story.by}</a
		>
		• {story.score}
		points •
		<a href={`/hackernews/${story.id}`} target="_blank" rel="noreferrer"
			>{story.descendants || '0'} comments</a
		>
		• {formatDate(story.time)}
	</div>
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
