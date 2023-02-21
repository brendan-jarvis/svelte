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
			const minutes = Math.floor(diff / 60);
			if (minutes === 1) {
				return `${minutes} minute ago`;
			}
			return `${minutes} minutes ago`;
		} else if (diff < 86400) {
			const hours = Math.floor(diff / 3600);
			if (hours === 1) {
				return `${hours} hour ago`;
			}
			return `${hours} hours ago`;
		} else {
			return date.toLocaleDateString('en-NZ', options);
		}
	};
</script>

<div class="post">
	<div class="post-header">
		<a href={story.url} class="post-title" target="”_blank”">{story.title}</a>
		{#if story.url}
			<span class="story-url"
				>(<a
					href={`https://news.ycombinator.com/from?site=${
						story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
					}`}
					target="”_blank”"
					>{story.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
				>)</span
			>
		{/if}
		<span class={`story-type ${story.type}`}>{story.type}</span>
	</div>
	<div class="post-info">
		<a href={`https://news.ycombinator.com/user?id=${story.by}`} target="”_blank”">
			by {story.by}</a
		>
		• {story.score}
		points •
		<a href={`https://news.ycombinator.com/item?id=${story.id}`} target="”_blank”"
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
