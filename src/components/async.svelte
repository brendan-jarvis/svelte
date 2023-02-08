<script lang="ts">

	async function getCat() {
		const res = await fetch(
			'/api/random-cat'
		);
  

		if (!res.ok) {
			throw new Error('Something went wrong');
		}

    console.log(res)
		return cat
	}

	let promise = getCat();

	function handleClick() {
		promise = getCat();
	}
</script>

<div class="container">
	<button on:click={handleClick}>GET CAT</button>

	{#await promise}
		<p>Waiting for cat...</p>
	{:then cat}
		<img src={cat} alt="A random cat" />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.container {
		display: flex;
		height: 90vh;
		align-items: center;
		justify-content: center;
	}

	button {
		position: absolute;
		padding: 10px 20px;
		font-size: larger;
		color: #fff;
		background-color: #000;
		border: #fff 1px solid;
		border-radius: 5px;
		font-family: 'Roboto', sans-serif;
		opacity: 0.7;
		cursor: pointer;
	}
	button:hover {
		opacity: 1;
	}
	button:focus {
		outline: none;
	}
</style>
