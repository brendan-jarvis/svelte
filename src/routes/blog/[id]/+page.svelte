<script lang="ts">
	import { marked } from 'marked';

	export let data: PageData;

	const { blogPost } = data;

	$: console.log(data);
</script>

<div class="content">
	<h1>{blogPost.title}</h1>

	{@html marked(blogPost.content)}
</div>

<style>
	h1 {
		text-align: center;
	}
	.content {
		text-align: left;
	}
</style>
