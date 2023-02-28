<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '../supabaseClient';

	let posts = {};

	let loading = false;

	onMount(() => {
		getBlogPosts();
	});

	const getBlogPosts = async () => {
		try {
			loading = true;
			let { data: posts, error } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false });

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
</script>

<h2>Blog</h2>

{#if loading}
	<p>Loading...</p>
{:else}
	{#each Object.entries(posts) as post}
		{console.log(post)}
		<div>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	{/each}
{/if}
