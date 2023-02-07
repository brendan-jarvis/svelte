<script>
	import Nested from '../components/nested.svelte';

	const name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<p>This is some red text.</p>

<img src={placekitten.src} alt={placekitten.alt} />

<Nested />

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
