<script lang="ts">
	export const prerender = true;

	import { writable } from 'svelte/store';
	import { supabase } from '$lib/supabaseClient';

	interface BlogPost {
		id: string | number;
		author: string;
		title: string;
		content: string;
		created_at: string | number;
		updated_at: string | number;
	}

	export const blogStore = writable<BlogPost[]>([]);

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
	$: console.log($blogStore);
</script>

<h2>Blog</h2>

{#if loading}
	<p>Loading...</p>
{:else if $blogStore.length === 0}
	<p>No blog posts yet</p>
{:else}
	{#each $blogStore as post (post.id)}
		<div>
			<h3>{post.title}</h3>
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
