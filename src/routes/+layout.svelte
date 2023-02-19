<script lang="ts">
	type Route = {
		href: string;
		text: string;
		preload: true | '' | 'hover' | 'off' | null | undefined;
	};

	let routes: Route[] = [
		{ href: '/', text: 'Home', preload: 'hover' },
		{ href: '/hackernews', text: 'Hackernews', preload: 'off' },
		{ href: '/about', text: 'About', preload: 'hover' }
	];
</script>

<nav>
	{#each routes as route}
		<a href={route.href} data-sveltekit-preload-data={route.preload}>{route.text}</a>
	{/each}
</nav>

<main>
	<slot />
</main>

<footer>Made by Brendan Jarvis while learning Svelte in 2023</footer>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		background-color: var(--polar-night-3);
		color: var(--snow-storm-1);
		font-family: 'Roboto Mono', monospace;
		font-size: 1.3rem;
		padding: 0.3rem;
	}

	nav a {
		color: var(--snow-storm-3);
		font-weight: bold;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--frost-2);
	}

	nav,
	footer {
		text-transform: uppercase;
	}

	footer {
		font-size: smaller;
		text-align: center;
		padding: 2rem;
		color: var(--frost-1);
		background-color: var(--polar-night-3);
		font-family: 'Roboto Mono', monospace;
	}
</style>
