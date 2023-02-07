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

<button on:click={handleClick}>Get cat</button>
<br />

{#await promise}
	<p>Waiting for cat...</p>
{:then cat}
	<img src={cat[0].url} alt="A random cat" />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
