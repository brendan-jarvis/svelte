<script lang="ts">
	import Kittens from '../../components/kittens.svelte';

	let count = 5;
</script>

<h2>Kittens!</h2>

<Kittens {count} />

<style>
	h2 {
		text-align: center;
		margin: 0;
		padding: 1rem 0;
	}
</style>
