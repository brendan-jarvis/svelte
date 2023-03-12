import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const prerender = true;

// TODO: Learn how to handle Supabase session in SvelteKit
export const load = (async ({ fetch }) => {
	const fetchBlogPosts = async () => {
		try {
			const { data, error } = await supabase
				.from('posts')
				.select('*')
				.limit(10)
				.order('created_at', { ascending: false })
				.then(({ data, error }) => ({ data, error }));

			if (error) {
				throw error;
			}

			return data;
		} catch (error) {
			console.log('Error loading blog posts: ', error);
		}
	};

	return {
		blogPosts: fetchBlogPosts(),
		session: null
	};
}) satisfies PageServerLoad;
