<script lang="ts">
	export let comment: Comment;

	type Comment = {
		by: string;
		id: number;
		kids: number[];
		parent: number;
		text: string;
		time: number;
		type: string;
		dead?: boolean;
	};

	import { formatDate } from '$lib/utils';

	let display = 'block';

	const fetchComment = async (id: number) => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		const data: Comment = await response.json();

		if (!response.ok) {
			throw new Error(`Something went wrong fetching comment: ${id}`);
		}

		return data;
	};

	const toggleComment = () => {
		// hide the parent div
		if (display === 'block') {
			display = 'none';
		} else {
			display = 'block';
		}
	};
</script>

{#if comment.by != undefined && !comment.dead}
	<div class="comment">
		<span class="comment-header">
			<a
				href={`https://news.ycombinator.com/user?id=${comment.by}`}
				class="post-title"
				target="_blank"
				rel="noreferrer"
				>{comment.by}
			</a>
			<span class="comment-time">{formatDate(comment.time)}</span>
			<button on:click={toggleComment}>
				{#if display === 'block'}
					[-]
				{:else}
					[+]
				{/if}
			</button>
		</span>
		<div class="comment-body" style:display>
			<div class="comment-text">
				{#if comment.text}
					{@html comment.text}
				{/if}
			</div>
			{#if comment.kids}
				<div class="comment-children">
					{#each comment.kids as kid}
						{#await fetchComment(kid)}
							<p>Loading comment...</p>
						{:then comment}
							<svelte:self {comment} />
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.comment-header {
		color: var(--aurora-2);
		font-size: small;
		padding-left: 0.5rem;
	}

	.comment-children {
		border-left: 1px solid var(--aurora-5);
	}

	.comment-text {
		background-color: var(--polar-night-2);
		padding: 0.5rem;
		overflow: auto;
	}

	.comment-text pre {
		background-color: var(--polar-night-3);
		color: var(--snow-storm-2);
	}

	button {
		background-color: var(--aurora-3);
		color: var(--polar-night-2);
		border: none;
		border-radius: 0.25rem;
		padding: 0.25rem;
		font-size: smaller;
	}
</style>
