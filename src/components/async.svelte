<script>
	async function getCat() {
		const res = await fetch('https://api.thecatapi.com/v1/images/search');
		const cat = await res.json();

		if (!res.ok) {
			throw new Error('Something went wrong');
		}

		return cat;
	}

	let promise = getCat();

	function handleClick() {
		promise = getCat();
	}
</script>

<button on:click={handleClick}>GET CAT</button>
<br />

{#await promise}
	<p>Waiting for cat...</p>
{:then cat}
	<img src={cat[0].url} alt="A random cat" />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	img {
		width: 100%;
		height: 95vh;
		object-fit: cover;
	}

	button {
		position: absolute;
		top: 5vh;
		left: 50%;
		padding: 10px 20px;
		font-size: larger;
		color: #fff;
		background-color: #000;
		border: none;
		border-radius: 5px;
		font-family: 'Roboto', sans-serif;
	}
</style>
