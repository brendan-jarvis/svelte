<script lang="ts">
	import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabaseClient';
	import md5 from 'md5';

	export let session: AuthSession;

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, website, avatar_url')
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				website = data.website;
				avatarUrl = data.avatar_url;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const updateProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date().toISOString()
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<img
	src={avatarUrl ? avatarUrl : `https://www.gravatar.com/avatar/${md5(session.user.email)}`}
	alt={`${username} avatar`}
/>

<form on:submit|preventDefault={updateProfile} class="form-widget">
	<label for="email">Email</label>
	<input id="email" type="text" bind:value={session.user.email} disabled />

	<label for="username">Name</label>
	<input id="username" type="text" bind:value={username} />

	<label for="website">Website</label>
	<input id="website" type="text" bind:value={website} />

	<button type="submit" class="primary block" disabled={loading}>
		{loading ? 'Saving ...' : 'Update profile'}
	</button>

	<button type="button" class="secondary block" on:click={() => supabase.auth.signOut()}>
		Sign Out
	</button>
</form>

<style>
	label {
		color: var(--aurora-2);
	}

	button {
		width: 100%;
	}

	.primary {
		background-color: var(--aurora-4);
		color: var(--polar-night-1);
	}

	.primary:hover,
	.primary:focus {
		border: 1px solid var(--frost-4) !important;
		text-decoration: underline;
	}

	.secondary {
		border: 1px solid var(--aurora-1) !important;
		color: var(--aurora-1);
		background-color: var(--polar-night-1);
	}

	.secondary:hover,
	.secondary:focus {
		background-color: var(--aurora-1);
		color: var(--polar-night-1);
		text-decoration: underline;
	}

	.block {
		display: block;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: left;
		gap: 1rem;
	}

	input:disabled {
		background-color: var(--polar-night-1);
		color: var(--snow-storm-3);
	}
</style>
