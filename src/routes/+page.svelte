<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { blogPosts } = data;
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="content">
	<h1>Welcome</h1>
	<img src="profile.jpg" alt="Brendan Jarvis at graduation" height={144} width={144} />
	<p>Welcome, my name is Brendan Jarvis. I am using this website to learn Svelte!</p>
	<h2>Projects</h2>
	<p>
		On this website I have built a <a href="/hackernews">HackerNews news reader</a> using the HackerNews
		API. Consuming this external API is hampered by a N+1 query problem, so it takes a while to load.
	</p>
	<p>
		I have a more information on my projects and a blog currently running using Next.js over at: <a
			href="https://nextjs-brendan-jarvis.vercel.app">nextjs-brendan-jarvis.vercel.app</a
		>
	</p>
	<h3>Contact</h3>
	<p>
		You can contact me on{' '}
		<a href="https://twitter.com/brendanjjarvis">Twitter</a>.
	</p>

	<h2>Blog</h2>
	{#if !blogPosts}
		<p>No blog posts yet</p>
	{:else}
		{#each blogPosts as post (post.id)}
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
</div>

<style>
	.content {
		max-width: 600px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
	}

	img {
		display: block;
		margin: 0 auto;
		border-radius: 50%;
	}
</style>
