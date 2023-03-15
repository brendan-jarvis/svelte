<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	type Route = {
		href: string;
		text: string;
		preload: true | '' | 'hover' | 'off' | null | undefined;
		target?: string;
		rel?: string;
	};

	let routes: Route[] = [
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

	let showSpinner = false;
	let timer: NodeJS.Timeout;

	$: {
		if ($navigating) {
			timer = setTimeout(() => {
				showSpinner = true;
			}, 250);
		} else {
			clearTimeout(timer);
			showSpinner = false;
		}
	}
</script>

<nav>
	{#each routes as route}
		<a
			href={route.href}
			target={route.target || null}
			rel={route.rel || null}
			data-sveltekit-preload-data={route.preload}
			class:active={$page.url.pathname === route.href}>{route.text}</a
		>
	{/each}
</nav>

<main>
	{#if showSpinner}
		<div class="lds-ring-parent">
			<h1>Loading ...</h1>
			<div class="lds-ring">
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	{:else}
		<slot />
	{/if}
</main>

<footer>
	<p>Made by Brendan Jarvis while learning Svelte in 2023.</p>
	<p>
		You can contact me on{' '}
		<a href="https://twitter.com/brendanjjarvis">Twitter</a>.
	</p>
</footer>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		background-color: var(--polar-night-3);
		color: var(--snow-storm-1);
		font-family: 'Roboto Mono', monospace;
		font-size: 1.3rem;
		padding: 0.3rem;
	}

	nav a {
		color: var(--snow-storm-3);
		font-weight: bold;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--frost-2);
	}

	nav a.active {
		color: var(--frost-3);
	}

	nav a.active:hover {
		color: var(--frost-2);
	}

	nav,
	footer {
		text-transform: uppercase;
	}

	footer {
		font-size: smaller;
		text-align: center;
		padding: 2rem;
		color: var(--frost-1);
		background-color: var(--polar-night-3);
		font-family: 'Roboto Mono', monospace;
	}

	/* LDS Loading animation from loading.io/css */
	.lds-ring-parent {
		display: flex;
		flex-direction: column; /* add this property to stack child elements vertically */
		justify-content: center;
		align-items: center;
		height: 50vh;
	}

	.lds-ring-parent h1 {
		margin-bottom: 1rem; /* add some margin below the h1 to create space between it and the spinner */
	}

	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
		margin: 0 auto;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
