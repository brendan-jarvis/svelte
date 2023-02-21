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

	const fetchComment = async (id: number) => {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		const data: Comment = await response.json();
		console.log(data);
		return data;
	};
</script>

<div class="comment">
	<div class="comment-header">
		<a href={comment.by} class="post-title" target="”_blank”">{comment.by}</a>
		<span class="comment-time">{formatDate(comment.time)}</span>
	</div>
	<div class="comment-body">
		<div class="comment-text">
			{#if comment.text}
				{comment.text}
			{/if}
		</div>
		{#if comment.kids}
			<div class="comment-children">
				{#each comment.kids as kid}
					<Comment comment: Comment={fetchComment(kid)} />
				{/each}
			</div>
		{/if}
	</div>
</div>
