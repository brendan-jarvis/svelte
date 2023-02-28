<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let blogPosts: Array | null;

	let loading = false;

	const getBlogPosts = async () => {
		try {
			loading = true;
			let { data: posts, error } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false });

			blogPosts = posts;

			if (error && status !== 406) throw error;

			// console.log(posts);
			// console.log(Object.keys(posts));
		} catch (error) {
			if (error instanceof Error) {
				error = error.message;
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
