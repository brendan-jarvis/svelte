<div id="page">
	<nav>
		<a href="/">Home</a>
		<a href="/kittens">Kittens</a>
		<a href="/get-cat">Random Cat</a>
	</nav>

	<main class="center">
		<slot />
	</main>

	<footer class="center">Made by Brendan Jarvis while learning Svelte in 2023</footer>
</div>

<style>
	:global(html) {
		overflow-y: scroll;
	}

	#page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		gap: 1rem;
	}

	.center {
		padding-left: max(1rem, calc(50vw - 350px));
		padding-right: max(1rem, calc(50vw - 350px));
	}

	nav,
	footer {
		text-transform: uppercase;
	}

	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60px;
		background-color: var(--polar-night-1);
		color: var(--snow-storm-1);
		padding: 0 20px;
	}

	nav a {
		color: var(--snow-storm-3);
		font-weight: bold;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--frost-4);
	}

	footer {
		font-size: smaller;
		text-align: center;
		padding: 3rem 0;
		color: var(--frost-1);
		margin-top: auto;
		font-family: 'Roboto Mono', monospace;
	}
</style>
