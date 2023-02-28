<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	export const prerender = true;

	type BlogPosts = { [x: string]: any }[] | null;

	let blogPosts: BlogPosts;

	let loading = false;

	const getBlogPosts = async () => {
		try {
			loading = true;
			let { data: posts, error } = await supabase
				.from('posts')
				.select('*')
				.limit(10)
				.order('created_at', { ascending: false });

			if (error) throw error;

			blogPosts = posts;
		} catch (error) {
			if (error) {
				console.log('Error loading blog posts: ', error);
			}
		} finally {
			loading = false;
		}
	};

	getBlogPosts();
</script>

<h2>Blog</h2>

{#if loading}
	<p>Loading...</p>
{:else if !blogPosts}
	<p>No blog posts yet</p>
{:else}
	{#each blogPosts as post (post)}
		<div>
			<h3>{post.title}</h3>
			<p>
				{new Intl.DateTimeFormat('en-NZ', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}).format(new Date(post.created_at))}
			</p>
		</div>
	{/each}
{/if}
