<script>
	const name = 'world';
  const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
</script>

<style>
	img {
		border-radius: 50%;
    border: 1px solid #0ff;
    box-shadow: 0 0 5px #f0f
	}
</style>

<h1>Hello {name.toUpperCase()}!</h1>

<img src={placekitten.src} alt={placekitten.alt}>