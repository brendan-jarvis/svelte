<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const { storyData } = data;
	const { post } = $page.params;

	console.log(data);
	console.log($page.params);
</script>

<h1>{storyData.title}</h1>

<ul>
	<li>{storyData.by}</li>
	<li>{storyData.descendants}</li>
	<li>{storyData.id}</li>
	<li>{storyData.kids}</li>
	<li>{storyData.score}</li>
	<li>{storyData.time}</li>
	<li>{storyData.type}</li>
	<li>{storyData.url}</li>
</ul>
