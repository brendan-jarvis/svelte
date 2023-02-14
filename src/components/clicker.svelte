<script lang="ts">
	import { typewriter } from '../utils';

	let count = 0;
	let clicked = false;
	$: doubled = count * 2;

	function calculatePoints(count: number) {
		let points = 2 * count;
		let primes = [];

		function isPrime(num: number) {
			for (let i = 2; i <= Math.sqrt(num); i++) {
				if (num % i === 0) {
					return false;
				}
			}
			return num > 1;
		}

		// Get all prime numbers in count
		for (let i = 2; i <= count; i++) {
			if (isPrime(i)) {
				primes.push(i);
			}
		}

		// Add 10 for every prime number in count
		points += 10 * primes.length;

		return points;
	}
</script>

<h2>Clicker</h2>
<p>Here's some reactivity.</p>
<p>
	Here's a link to an external website:
	<a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a>
</p>
<p>Doubled: {doubled}.</p>
<p>Points: {calculatePoints(count)}</p>

<p>Ordered List:</p>
<ol>
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as number}
		<li>{number}</li>
	{/each}
</ol>

<p>Unordered List:</p>
<ul>
	{#each [1, 2, 3, 4, 5] as number}
		<li>{number}</li>
	{/each}
</ul>

<button on:click={() => (count += 1)}>Clicked {count} {count === 1 ? 'time' : 'times'}</button>
{#if !clicked}
	<button on:click={() => (clicked = true)}>Click me!</button>
{:else}
	<button on:click={() => (clicked = false)}>Unclick me!</button>
{/if}

{#if clicked}
	<p class="success" transition:typewriter={{ speed: 1 }}>
		ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
		dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.
	</p>
{/if}
