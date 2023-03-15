<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { blogPosts, projects } = data;
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="content">
	<h1>Welcome</h1>
	<img src="profile.jpg" alt="Brendan Jarvis at graduation" height={144} width={144} />
	<p>Welcome, my name is Brendan Jarvis. I am using this website to learn Svelte!</p>
	<h2>Contact</h2>
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

	<h2>Projects</h2>
	{#if !projects}
		<p>
			Whoops, project data failed to load properly. You could check out <a
				href="https://github.com/brendan-jarvis/"
			>
				my profile on GitHub</a
			> instead.
		</p>
	{:else}
		{#each projects as project (project.id)}
			<div>
				<a href={project.url} class="blog-link">
					<h3>{project.title}</h3>
				</a>
				{#if project.created_at}
					<p>
						{new Intl.DateTimeFormat('en-NZ', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						}).format(new Date(project.created_at))}
					</p>
				{/if}
				<p>{project.content}</p>
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
