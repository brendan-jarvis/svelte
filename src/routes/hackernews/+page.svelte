<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import Story from './Story.svelte';

	export let data: PageData;

	let { topStories, bestStories, newStories } = data;

	$: stories = [
		{
			title: 'Top Stories',
			data: topStories
		},
		{
			title: 'Best Stories',
			data: bestStories
		},
		{
			title: 'New Stories',
			data: newStories
		}
	];
	let sort: string;
	let selectedView = 'top-stories';

	const pointsSort = () => {
		if (sort === 'points' || sort === 'points-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'points' ? 'points-reverse' : 'points';

			return;
		}

		topStories = topStories.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
		bestStories = bestStories.sort(
			(a: { score: number }, b: { score: number }) => b.score - a.score
		);
		newStories = newStories.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

		sort = 'points';
	};

	const commentsSort = () => {
		if (sort === 'comments' || sort === 'comments-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'comments' ? 'comments-reverse' : 'comments';

			return;
		}

		topStories = topStories.sort(
			(a: { descendants: number }, b: { descendants: number }) => b.descendants - a.descendants
		);
		bestStories = bestStories.sort(
			(a: { descendants: number }, b: { descendants: number }) => b.descendants - a.descendants
		);
		newStories = newStories.sort(
			(a: { descendants: number }, b: { descendants: number }) => b.descendants - a.descendants
		);

		sort = 'comments';
	};

	const dateSort = () => {
		if (sort === 'date' || sort === 'date-reverse') {
			topStories = topStories.reverse();
			bestStories = bestStories.reverse();
			newStories = newStories.reverse();

			sort = sort === 'date' ? 'date-reverse' : 'date';

			return;
		}

		topStories = topStories.sort((a: { time: number }, b: { time: number }) => b.time - a.time);
		bestStories = bestStories.sort((a: { time: number }, b: { time: number }) => b.time - a.time);
		newStories = newStories.sort((a: { time: number }, b: { time: number }) => b.time - a.time);

		sort = 'date';
	};
</script>

<h1>Hackernews</h1>
<label
	>Sort by:
	<button value="points" on:click={pointsSort}
		>Points{#if sort === 'points'}▼{/if}{#if sort === 'points-reverse'}▲{/if}</button
	>
	<button value="comments" on:click={commentsSort}
		>Comments{#if sort === 'comments'}▼{/if}{#if sort === 'comments-reverse'}▲{/if}</button
	>
	<button value="date" on:click={dateSort}
		>Date posted{#if sort === 'date'}▼{/if}{#if sort === 'date-reverse'}▲{/if}</button
	>
</label>

<label id="story-select"
	>View by:
	<select bind:value={selectedView} name="stories">
		<option value="top-stories">Top Stories</option>
		<option value="best-stories">Best Stories</option>
		<option value="new-stories">New Stories</option>
	</select>
</label>

<div class="container" in:fade={{ delay: 250 }}>
	{#each stories as post (post)}
		<div
			class={`posts ${
				selectedView === post.title.toLowerCase().replaceAll(' ', '-')
					? 'selected-view'
					: 'unselected-view'
			}`}
		>
			<h2>{post.title}</h2>
			{#each post.data as story (story)}
				<Story {story} />
			{/each}
		</div>
	{/each}
</div>

<svelte:head>
	<title>Hackernews Viewer - by Brendan Jarvis</title>
	<meta name="description" content="Hackernews viewer built using Svelte by Brendan Jarvis" />
</svelte:head>

<style>
	@media (max-width: 950px) {
		.container {
			grid-template-columns: repeat(1, 1fr) !important;
		}

		.posts {
			grid-auto-rows: minmax(50px, auto) !important;
		}

		.unselected-view {
			display: none !important;
		}

		h2 {
			display: none;
		}

		#story-select {
			display: block;
			width: 100%;
			margin-bottom: 1rem;
		}
	}

	@media (min-width: 950px) {
		#story-select {
			display: none;
		}
	}

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: minmax(100px, auto);
		grid-gap: 1rem;
	}

	h1 {
		text-align: center;
	}

	label {
		display: flex;
		justify-content: center;
		align-items: baseline;
		font-size: larger;
		gap: 1rem;
	}

	label button {
		background-color: var(--aurora-3);
		color: var(--polar-night-1);
		font-size: smaller;
		font-weight: bold;
		border: none;
		border-radius: 0.2rem;
		padding: 0.3rem;
		cursor: pointer;
	}

	label select {
		background-color: var(--aurora-3);
		text-transform: uppercase;
		color: var(--polar-night-1);
		font-size: smaller;
		font-weight: bold;
		border: none;
		border-radius: 0.2rem;
		padding: 0.3rem;
		cursor: pointer;
	}

	.posts {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: minmax(100px, auto);
		grid-gap: 1rem;
	}

	.post {
		display: flex;
		flex-direction: column;
		align-items: space-around;
	}
</style>
