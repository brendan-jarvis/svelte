<script>
	import Nested from '../components/nested.svelte';

	const name = 'world';
	const placekitten = { src: 'https://placekitten.com/500/500', alt: 'A cute kitten' };
	const html = '<p>Some HTML. We can use this feature to expose our website to XSS attacks.</p>';
	let count = 0;
	$: doubled = count * 2;

	/**
	 * @param {number} count
	 */
	function calculatePoints(count) {
		let points = 2 * count;
		let primes = [];

		// Check if the number is prime
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

<h1>Hello {name.toUpperCase()}!</h1>

{@html html}

<img src={placekitten.src} alt={placekitten.alt} />

<Nested />

<h2>Clicker</h2>
<p>Here's some reactivity.</p>
<p>Doubled: {doubled}.</p>
<p>Points: {calculatePoints(count)}</p>

<button on:click={() => (count += 1)}>Clicked {count} {count === 1 ? 'time' : 'times'}</button>

<style>
	img {
		border-radius: 50%;
		border: 1px solid #0ff;
		box-shadow: 0 0 5px #f0f;
	}

	p {
		color: red;
	}
</style>
