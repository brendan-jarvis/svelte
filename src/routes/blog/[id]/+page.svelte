<script lang="ts">
	export const prerender = true;

	export async function load({ params }) {
		const res = await fetch(`/api/blog/${params.id}`);
		const post = await res.json();

		return { post };
	}
</script>

<h2>{blogPost.title}</h2>

<p>{@html marked(blogPost.content)}</p>
