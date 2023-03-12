<script lang="ts">
	import { onDestroy } from 'svelte';
	import { blogStore } from '$lib/stores';
	import { page } from '$app/stores';
	import { marked } from 'marked';

	interface BlogPost {
		id: string | number;
		author: string;
		title: string;
		content: string;
		created_at: string | number;
		updated_at: string | number;
	}

	let blogPost: BlogPost;

	const { id } = $page.params;

	const unsubscribe = blogStore.subscribe((blogPosts) => {
		blogPost = blogPosts.find<BlogPost>(
			(post): BlogPost => Number(post.id) === Number(id)
		) as BlogPost;
	});

	onDestroy(unsubscribe);
</script>

<h2>{blogPost.title}</h2>

<p>{@html marked(blogPost.content)}</p>
