<script lang="ts">
	import Clicker from '../components/clicker.svelte';

	let name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
	const html = '<p>Some HTML. We can use this feature to expose our website to XSS attacks.</p>';
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<h1>Hello {name.toUpperCase()}!</h1>

<label for="name">Change name: </label>
<input type="text" bind:value={name} />

{@html html}

<img src={placekitten.src} alt={placekitten.alt} />

<Clicker />

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
		background-color: var(--polar-night-1);
		color: var(--snow-storm-1);
		font-family: 'Roboto', sans-serif;
	}

	:global(color) {
		color: var(--snow-storm-1);
	}

	:global(button) {
		background-color: var(--frost-1);
		text-transform: uppercase;
		color: var(--polar-night-1);
		border: var(--polar-night-1) 1px solid;
		border-radius: 5px;
		padding: 10px;
		font-size: 1.2rem;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
	}

	:global(button:hover) {
		background-color: var(--polar-night-1);
		color: var(--frost-1);
		border: var(--frost-3) 1px solid;
	}

	:global(button:focus) {
		outline: none;
	}

	img {
		border-radius: 50%;
		border: 1px solid var(--frost-4);
		box-shadow: 0 0 5px var(--polar-night-1);
	}
</style>
