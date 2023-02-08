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
		gap: 5vw;
	}

	.center {
		padding-left: max(1rem, calc(50vw - 350px));
		padding-right: max(1rem, calc(50vw - 350px));
	}

	nav,
	footer {
		text-transform: uppercase;
		letter-spacing: 0.1px;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		background-color: #333;
		color: white;
		padding: 0 20px;
	}

	nav a {
		color: white;
		text-decoration: none;
		margin-right: 20px;
	}

	nav a:hover {
		color: #0ff;
	}

	footer {
		font-size: 0.7rem;
		text-align: center;
		padding: 3rem 0;
		color: #777;
		margin-top: auto;
	}
</style>
