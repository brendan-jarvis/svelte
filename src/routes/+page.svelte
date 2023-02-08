<script lang="ts">
	import Clicker from '../components/clicker.svelte';

	let name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
	const html = '<p>Some HTML. We can use this feature to expose our website to XSS attacks.</p>';
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<label for="name">Change name: </label>
<input type="text" bind:value={name} />

{@html html}

<img src={placekitten.src} alt={placekitten.alt} />

<Clicker />

<style>
	img {
		border-radius: 50%;
		border: 1px solid #0ff;
		box-shadow: 0 0 5px #f0f;
	}
</style>
