<script lang="ts">
	import { fly } from 'svelte/transition';
	export let count: number = 3;
	let kittenUrls: string[] = [];

	$: getKittenUrls();

	function getKittenUrls() {
		kittenUrls = [];
		for (let i = 0; i < count; i++) {
			kittenUrls.push(`http://placekitten.com/200/300?image=${i}`);
		}
	}
</script>

<div class="control-panel">
	<label>
		{count} kittens:
		<input type="range" bind:value={count} on:change={getKittenUrls} min="5" max="21" />
	</label>
</div>

<div class="kitten-grid">
	{#each kittenUrls as url (url)}
		<img class="kitten-image" src={url} alt="A cute kitten." transition:fly={{ y: 200 }} />
	{/each}
</div>

<style>
	.control-panel {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	label {
		display: flex;
		align-items: center;
		font-size: larger;
		margin-right: 0.5em;
	}

	input[type='range'] {
		width: 20em;
	}

	.kitten-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	.kitten-image {
		width: 200px;
		height: 300px;
	}
</style>
