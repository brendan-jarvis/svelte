<script lang="ts">
	import { fly } from 'svelte/transition';
	export let count: number = 5;
	let kittenUrls: string[] = [];

	$: getKittenUrls();

	function getKittenUrls() {
		kittenUrls = [];
		for (let i = 0; i < count; i++) {
			kittenUrls.push(`http://placekitten.com/200/300?image=${i}`);
		}
	}
</script>

<label>
	Want more than {count} kittens?
	<input type="range" bind:value={count} on:change={getKittenUrls} min="5" max="20" />
</label>

<div class="kitten-grid">
	{#each kittenUrls as url (url)}
		<img
			class="kitten-image"
			src={url}
			alt="A cute kitten."
			transition:fly={{ y: 200, duration: 2000 }}
		/>
	{/each}
</div>

<style>
	.kitten-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 10px;
	}

	.kitten-image {
		width: 200px;
		height: 300px;
	}
</style>
