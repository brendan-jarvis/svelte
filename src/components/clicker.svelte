<script>
	let count = 0;
	let clicked = false;
	$: doubled = count * 2;

	/**
	 * @param {number} count
	 */
	function calculatePoints(count) {
		let points = 2 * count;
		let primes = [];

		/**
		 * @param {number} num
		 */
		function isPrime(num) {
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
{/if}
{#if clicked}
	<button on:click={() => (clicked = false)}>Unclick me!</button>
{/if}
