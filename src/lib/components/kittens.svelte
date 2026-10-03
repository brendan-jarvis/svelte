<script lang="ts">
	import { run } from 'svelte/legacy';

	import { fly } from 'svelte/transition';
	interface Props {
		count?: number;
	}

	let { count = $bindable(3) }: Props = $props();
	let kittenUrls: string[] = $state([]);

	function getKittenUrls() {
		kittenUrls = [];
		for (let i = 0; i < count; i++) {
			kittenUrls.push(`http://placekitten.com/200/300?image=${i}`);
		}
	}
	run(() => {
		getKittenUrls();
	});
</script>

<div class="control-panel">
	<label>
		{count} kittens:
		<input type="range" bind:value={count} onchange={getKittenUrls} min="5" max="21" />
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
