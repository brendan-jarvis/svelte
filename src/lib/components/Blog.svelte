<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	interface BlogPost {
		author: string;
		content: string | null;
		created_at: string | null;
		id: number;
		title: string | null;
		updated_at: string | null;
	}

	let loadingBlogPosts = false;
	let blogPosts: BlogPost[] | null = null;

	const fetchBlogPosts = async () => {
		try {
			loadingBlogPosts = true;
			const { data, error } = await supabase
				.from('posts')
				.select('*')
				.limit(10)
				.order('created_at', { ascending: false })
				.then(({ data, error }) => ({ data, error }));

			if (error) {
				throw error;
			}

			blogPosts = data;
		} catch (error) {
			console.log('Error loading blog posts: ', error);
		} finally {
			loadingBlogPosts = false;
		}
	};

	fetchBlogPosts();
</script>

<h2>Blog</h2>

{#if loadingBlogPosts}
	<p>Loading...</p>
{:else if !blogPosts}
	<p>No blog posts yet</p>
{:else}
	{#each blogPosts as post (post.id)}
		<div>
			<a href="/blog/{post.id}" class="blog-link">
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
