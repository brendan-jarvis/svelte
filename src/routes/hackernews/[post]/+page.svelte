<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Comment from './Comment.svelte';

	import { formatDate } from '../../../lib/utils';

	export let data: PageData;
	const { storyData, commentData } = data;
	const { post } = $page.params;
</script>

<h1>{storyData.title}</h1>
<span class="story-url"
	>(<a
		href={`https://news.ycombinator.com/from?site=${
			storyData.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
		}`}
		target="”_blank”">{storyData.url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]}</a
	>)</span
>
<p>
	{storyData.score} points by {storyData.by}
	{formatDate(storyData.time)} | {storyData.descendants} comments
</p>

<ul>
	<h2>Comments</h2>
	<div class="comments">
		{#each commentData as comment}
			<Comment {comment} />
		{/each}
	</div>
</ul>
