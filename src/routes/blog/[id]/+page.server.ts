import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = (async ({ fetch, params }) => {
	// TODO: Learn how to handle Supabase session in SvelteKit
	const fetchBlogPost = async () => {
		const res = await fetch(`/api/blog/${params.id}`);
		const { data } = await res.json();

		if (!res.ok) {
			throw error(
				res.status,
				`Something went wrong fetching blog from internal API: /api/blog/${params.id}`
			);
		}

		return data;
	};

	return {
		blogPost: fetchBlogPost(),
		session: null
	};
}) satisfies PageServerLoad;
