<script lang="ts">
	import Clicker from '../lib/components/clicker.svelte';

	let name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
	const html = '<p>Some HTML. We can use this feature to expose our website to XSS attacks.</p>';
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="content">
	<h1>Hello {name.toUpperCase()}!</h1>

	<label for="name">Change name: </label>
	<input type="text" bind:value={name} />

	{@html html}

	<img src={placekitten.src} alt={placekitten.alt} />

	<Clicker />
</div>
