<script>
	let routes = [
		{ href: '/', text: 'Home' },
		{ href: '/kittens', text: 'Kittens' },
		{ href: '/get-cat', text: 'Random Cat' }
	];
</script>

<nav>
	{#each routes as route}
		<a href={route.href}>{route.text}</a>
	{/each}
</nav>

<main>
	<slot />
</main>

<footer>Made by Brendan Jarvis while learning Svelte in 2023</footer>
