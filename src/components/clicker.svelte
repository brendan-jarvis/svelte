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
<p>Doubled: {doubled}.</p>
<p>Points: {calculatePoints(count)}</p>

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
