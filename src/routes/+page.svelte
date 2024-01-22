<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	export let data;

	let { blogPosts, projects } = data;
	$: ({ blogPosts, projects } = data);
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="flex flex-col text-center">
	<h1 class="">Welcome</h1>
	<img
		class="rounded-tr-lg mx-auto"
		src="profile.jpg"
		alt="Brendan Jarvis - University graduation"
		height={144}
		width={144}
	/>
	<p>Welcome, my name is Brendan Jarvis. I am using this website to learn Svelte!</p>

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
				<a href={project.url} class="blog-link" target="_blank" rel="noreferrer">
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
