<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import { fly } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
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

	let showReplies = false;
</script>

{#if comment.by != undefined && !comment.dead}
	<div class="comment" transition:fly={{ x: 10, y: 10, duration: 500, easing: circInOut }}>
		<span class="comment-header">
			<a
				href={`https://news.ycombinator.com/user?id=${comment.by}`}
				class="post-title"
				target="_blank"
				rel="noreferrer"
				>{comment.by}
			</a>
			<span class="comment-time">{formatDate(comment.time)}</span>
			<button class="toggle-comment-display" on:click={toggleComment} title="Show/Hide Comment">
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
					{@html DOMPurify.sanitize(comment.text)}
				{/if}
				{#if comment.kids && !showReplies}
					<button class="show-replies" on:click={() => (showReplies = true)} title="Show Replies"
						>Show {comment.kids.length.toLocaleString()}
						{comment.kids.length > 1 ? 'replies' : 'reply'}</button
					>
				{/if}
			</div>

			{#if comment.kids && showReplies}
				<!-- show replies -->
				<div class="comment-children">
					{#each comment.kids as kid}
						{#await fetchComment(kid) then comment}
							<svelte:self {comment} />
						{:catch error}
							<div
								class="comment-body"
								transition:fly={{ x: 10, y: 10, duration: 500, easing: circInOut }}
							>
								<div class="comment-text">
									<p style="color: red">{error.message}</p>
								</div>
							</div>
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
		border-left: 1px solid var(--polar-night-4);
		padding: 5px 0 0 5px;
	}

	.comment-text {
		background-color: var(--polar-night-2);
		padding: 5px;
		overflow: auto;
		font-size: 14px;
	}

	.toggle-comment-display {
		width: 25px;
		height: 20px;
		background-color: var(--aurora-3);
		font-family: 'Roboto Mono', monospace;
		color: var(--polar-night-2);
		text-align: center;
		line-height: 7.5px;
		border: none;
		border-radius: 3px;
		padding: 3px;
		font-size: smaller;
		vertical-align: middle;
	}

	.show-replies {
		margin-top: 0.25rem;
		padding: 0.25rem;
		font-size: smaller;
		font-family: 'Roboto Mono', monospace;
		display: block;
		color: var(--aurora-3);
		background-color: var(--polar-night-2);
		border: 1px solid var(--aurora-3);
		border-radius: 0px;
		text-decoration: underline;
		text-transform: none;
	}

	.show-replies:hover,
	.show-replies:focus {
		color: var(--polar-night-2);
		background-color: var(--aurora-3);
		border: 1px solid var(--polar-night-2);
	}
</style>
