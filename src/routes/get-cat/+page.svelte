<script lang="ts">
	export let data;
	const { cat } = data;

	async function handleClick() {}
</script>

<div class="container">
	<!-- <button on:click={handleClick}>GET CAT</button> -->

	<img src={cat[0].url} alt="A random cat" />
</div>

<svelte:head>
	<title>Random Cat - Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

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
