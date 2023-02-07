<script>
	import Nested from '../components/nested.svelte';

	const name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
	const html = '<p>Some HTML. We can use this feature to expose our website to XSS attacks.</p>';
	let count = 0;
</script>

<h1>Hello {name.toUpperCase()}!</h1>

{@html html}

<img src={placekitten.src} alt={placekitten.alt} />

<Nested />

<p>Here's some reactivity: {count}</p>

<button on:click={() => (count += 1)}>Clicked {count} {count === 1 ? 'time' : 'times'}</button>

<style>
	img {
		border-radius: 50%;
		border: 1px solid #0ff;
		box-shadow: 0 0 5px #f0f;
	}

	p {
		color: red;
	}
</style>
