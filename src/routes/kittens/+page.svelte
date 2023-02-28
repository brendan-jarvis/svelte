<script lang="ts">
	import Kittens from '$lib/components/kittens.svelte';

	let count = 3;
</script>

<svelte:head>
	<title>Kittens - Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<h2>Kittens!</h2>

<Kittens {count} />

<style>
	h2 {
		text-align: center;
		margin: 0;
		padding: 1rem 0;
		color: var(--frost-1);
	}
</style>
