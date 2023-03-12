<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { AuthSession } from '@supabase/supabase-js';
	import Account from '$lib/components/Account.svelte';
	import Auth from '$lib/components/Auth.svelte';

	let session: AuthSession | null;

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			session = data.session;
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session;
		});
	});
</script>

<svelte:head>
	<title>Svelte by Brendan Jarvis</title>
	<meta name="description" content="A website built using Svelte by Brendan Jarvis" />
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	{#if !session}
		<Auth />
	{:else}
		<Account {session} />
	{/if}
</div>
