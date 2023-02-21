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

<ul>
	<li>By {storyData.by}</li>
	<li>ID {storyData.id}</li>
	<li>Replies {storyData.descendants}</li>
	<li>Score {storyData.score}</li>
	<li>Posted {formatDate(storyData.time)}</li>
	<li>Type {storyData.type}</li>
	<li>URL {storyData.url}</li>

	<h2>Comments</h2>
	<div class="comments">
		{#each commentData as comment}
			<Comment {comment} />
		{/each}
	</div>
</ul>
