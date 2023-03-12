<script lang="ts">
	export const prerender = true;

	import { blogStore } from '$lib/stores';
	import { supabase } from '$lib/supabaseClient';

	let loading = false;

	const fetchBlogPosts = async () => {
		try {
			loading = true;
			const { data, error } = await supabase
				.from('posts')
				.select('*')
				.limit(10)
				.order('created_at', { ascending: false })
				.then(({ data, error }) => ({ data, error }));

			if (error) {
				throw error;
			}

			blogStore.set(data);
		} catch (error) {
			console.log('Error loading blog posts: ', error);
		} finally {
			loading = false;
		}
	};

	fetchBlogPosts();
</script>

<h2>Blog</h2>

{#if loading}
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
