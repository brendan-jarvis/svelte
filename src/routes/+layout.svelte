<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const routes = [
		{ href: '/', text: 'Home', preload: 'hover' },
		{ href: '/hackernews', text: 'Hackernews', preload: 'hover' },
		{
			href: 'https://github.com/brendan-jarvis',
			text: 'GitHub',
			preload: 'hover',
			target: '_blank',
			rel: 'noreferrer'
		}
	];
</script>

<nav class="flex uppercase justify-around items-center font-mono text-xl bg-polar-night-3 py-2">
	{#each routes as route}
		<a
			class="text-snow-storm-3 font-bold hover:text-frost-2"
			href={route.href}
			target={route.target}
			rel={route.rel}
			>{route.text}
		</a>
	{/each}
</nav>

<main>
	<slot />
</main>

<footer class="text-sm text-center p-2 text-frost-1 bg-polar-night-3 font-mono uppercase">
	<p>Made by Brendan Jarvis while learning Svelte in 2023.</p>
	<p>
		You can contact me on{' '}
		<a href="https://x.com/brendanjjarvis">X.com</a>.
	</p>
</footer>
