<script lang="ts">
	export let comment: Comment;

	import Comment from './Comment.svelte';

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

	const fetchComment = async (id: number) => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		const data: Comment = await response.json();

		return data;
	};
</script>

{#if !comment.by}
	<div class="comment">
		<div class="comment-header">
			<span class="post-title">[deleted]</span>
		</div>
	</div>
{:else}
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
						<Comment comment={fetchComment(kid)} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
