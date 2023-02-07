<script>
	/**
	 * @type {number}
	 */
	export let count = 5;
	/**
	 * @type string[]
	 */
	let kittenUrls = [];

	function getKittenUrls() {
		for (let i = 0; i < count; i++) {
			kittenUrls.push(`http://placekitten.com/200/300?image=${i}`);
		}
	}

	getKittenUrls();
</script>

<h2>Kittens!</h2>
<div class="kitten-grid">
	{#each kittenUrls as url (url)}
		<img class="kitten-image" src={url} alt="A cute kitten." />
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
