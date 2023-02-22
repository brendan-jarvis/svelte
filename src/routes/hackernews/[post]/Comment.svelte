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

{#if comment.by != undefined}
	<div class="comment">
		<div class="comment-header">
			<a href={comment.by} class="post-title" target="”_blank”">{comment.by}</a>
			<span class="comment-time">{formatDate(comment.time)}</span>
		</div>
		<div class="comment-body">
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
	.comment-children {
		margin-left: 1rem;
	}

	.comment-text {
		max-width: 600px;
	}
</style>
