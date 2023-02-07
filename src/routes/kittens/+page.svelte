<script lang="ts">
	import Kittens from '../../components/kittens.svelte';
	import Nav from '../../components/nav.svelte';

	let count = 5;
</script>

<Nav />
<h2>Kittens!</h2>

<Kittens {count} />

<style>
	h2 {
		text-align: center;
		margin: 0;
		padding: 1rem 0;
	}
</style>
