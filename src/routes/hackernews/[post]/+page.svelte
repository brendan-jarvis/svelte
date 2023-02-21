<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Comment from './Comment.svelte';

	export let data: PageData;

	const { storyData, commentData } = data;
	const { post } = $page.params;
</script>

<h1>{storyData.title}</h1>

<ul>
	<li>By {storyData.by}</li>
	<li>{storyData.descendants}</li>
	<li>{storyData.id}</li>
	<li>{storyData.kids}</li>
	<li>{storyData.score}</li>
	<li>{storyData.time}</li>
	<li>{storyData.type}</li>
	<li>{storyData.url}</li>

	<h2>Comments</h2>
	<div class="comments">
		{#each commentData as comment}
			<Comment {comment} />
		{/each}
	</div>
</ul>
