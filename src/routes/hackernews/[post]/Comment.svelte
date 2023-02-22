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

	import { formatDate } from '../../../lib/utils';

	let commentData: Comment;

	const fetchComment = async (id: number) => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		const data: Comment = await response.json();

		if (!response.ok) {
			throw new Error(`Something went wrong fetching comment: ${id}`);
		}

		return data;
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
		</span>

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
{/if}

<style>
	.comment {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
		padding: 0.5rem;
	}

	.comment-header {
		color: var(--aurora-2);
		font-size: small;
	}

	.comment-children {
		margin-left: 1rem;
		padding-left: 0.5rem;
		border-left: 1px solid var(--aurora-5);
	}

	.comment-text {
		max-width: 700px;
		background-color: var(--polar-night-2);
		padding: 0.5rem;
	}
</style>
