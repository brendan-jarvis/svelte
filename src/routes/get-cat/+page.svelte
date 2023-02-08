<script lang="ts">
	import type { PageLoad } from './$types';

	export const load = (async () => {
		const res = await fetch(`https://api.thecatapi.com/v1/images/search`);
		const cat = await res.json();

		if (!res.ok) {
			throw new Error('Something went wrong');
		}

		return cat;
	}) satisfies PageLoad;

	// let promise = getCat();
	let promise = load();

	function handleClick() {
		// promise = getCat();
		promise = load();
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
		max-height: 60vh;
		object-fit: cover;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
	}

	button {
		padding: 10px;
		text-transform: uppercase;
		font-size: larger;
		color: #fff;
		background-color: #000;
		border: #fff 1px solid;
		border-radius: 5px;
		margin-bottom: 1rem;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
	}
	button:hover {
		background-color: #fff;
		color: #000;
		border: #000 1px solid;
	}
	button:focus {
		outline: none;
	}
</style>
