<script lang="ts">
	export const prerender = true;

	import { blogStore, fetchBlogPosts, loadingBlogPosts } from '$lib/stores';

	fetchBlogPosts();
</script>

<h2>Blog</h2>

{#if loadingBlogPosts}
	<p>Loading...</p>
{:else if !$blogStore}
	<p>No blog posts yet</p>
{:else}
	{#each $blogStore as post (post.id)}
		<div>
			<a href="/blog/{post.id}" class="blog-post-link">
				<h3>{post.title}</h3>
			</a>
			{#if post.created_at}
				<p>
					{new Intl.DateTimeFormat('en-NZ', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					}).format(new Date(post.created_at))}
				</p>
			{/if}
		</div>
	{/each}
{/if}
