<div id="page">
	<nav>
		<a href="/">Home</a>
		<a href="/kittens">Kittens</a>
		<a href="/get-cat">Random Cat</a>
	</nav>

	<main class="center">
		<div class="content">
			<slot />
		</div>
		<footer class="center">Made by Brendan Jarvis while learning Svelte in 2023</footer>
	</main>
</div>

<style>
	:global(:root) {
		--polar-night-1: #2e3440;
		--polar-night-2: #3b4252;
		--polar-night-3: #434c5e;
		--polar-night-4: #4c566a;

		--snow-storm-1: #d8dee9;
		--snow-storm-2: #e5e9f0;
		--snow-storm-3: #eceff4;

		--frost-1: #8fbcbb;
		--frost-2: #88c0d0;
		--frost-3: #81a1c1;
		--frost-4: #5e81ac;

		--aurora-1: #bf616a;
		--aurora-2: #d08770;
		--aurora-3: #ebcb8b;
		--aurora-4: #a3be8c;
		--aurora-5: #b48ead;
	}

	:global(body) {
		background-image: linear-gradient(
			to bottom,
			var(--polar-night-4) 0%,
			var(--polar-night-1) 100%
		);
		color: var(--snow-storm-1);
		font-family: 'Roboto', sans-serif;
		margin: 0; /* Reset margins */
	}

	:global(html) {
		overflow-y: scroll;
	}

	:global(.content) {
		background-color: var(--polar-night-1);
		padding: 0.5rem 0.5rem 0.5rem;
		border-radius: 5px;
		max-width: 93%;
	}

	#page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		gap: 1rem;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 100%;
		margin: 0 auto;
	}

	/* Colored heading tags */
	:global(main h1) {
		color: var(--aurora-1);
	}

	:global(main h2) {
		color: var(--aurora-2);
	}

	:global(main h3) {
		color: var(--aurora-3);
	}

	:global(main h4) {
		color: var(--aurora-4);
	}

	:global(main h5, h6) {
		color: var(--aurora-5);
	}

	/* Alerts */
	:global(.error) {
		background-color: var(--aurora-1);
		color: var(--polar-night-1);
		padding: 0.5rem;
	}

	:global(.warning) {
		background-color: var(--aurora-2);
		color: var(--polar-night-1);
		padding: 0.5rem;
	}

	:global(.info) {
		background-color: var(--frost-3);
		color: var(--polar-night-1);
		padding: 0.5rem;
	}

	:global(.success) {
		background-color: var(--aurora-4);
		color: var(--polar-night-1);
		padding: 0.5rem;
	}

	/* Input styling */
	:global(input) {
		border: 1px solid var(--frost-4);
		border-radius: 5px;
		padding: 10px;
		font-size: 1.2rem;
		font-family: 'Roboto', sans-serif;
	}

	:global(input:focus) {
		outline: var(--frost-2) 1px solid;
		border: 1px solid var(--frost-2);
	}

	/* Button styling */
	:global(button) {
		text-transform: uppercase;
		background-color: var(--polar-night-4);
		color: var(--snow-storm-1);
		border: var(--frost-4) 1px solid;
		border-radius: 5px;
		padding: 0.5rem;
		font-size: 1.2rem;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
	}

	:global(button:hover) {
		color: var(--snow-storm-1);
		background-color: var(--polar-night-2);
		border: var(--frost-2) 1px solid;
	}

	:global(button:active) {
		background-color: var(--polar-night-3);
	}

	:global(button:focus) {
		background-color: var(--polar-night-4);
		background-color: var(--polar-night-3);
		border: var(--frost-2) 1px solid;
		outline: none;
	}

	/* Image styling */
	:global(img) {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}

	/* Link styling */
	:global(a) {
		color: var(--frost-2);
	}

	:global(a:visited) {
		color: var(--frost-3);
	}

	:global(a:hover) {
		color: var(--frost-4);
	}

	/* Navigation styling */
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
		padding: 3rem 0;
		color: var(--frost-1);
		margin-top: auto;
		font-family: 'Roboto Mono', monospace;
	}
</style>
