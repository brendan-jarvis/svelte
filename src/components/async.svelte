<script lang="ts">
	import { env } from '$env/dynamic/public';

	async function getCat() {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?api_key=${env.PUBLIC_CAT_API_KEY}}`
		);
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

<div class="container">
	<button on:click={handleClick}>GET CAT</button>

	{#await promise}
		<p>Waiting for cat...</p>
	{:then cat}
		<img src={cat[0].url} alt="A random cat" />
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
