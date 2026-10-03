import type { PageServerLoad } from './$types';
import { supabase } from '#lib/supabaseClient.js';

export const prerender = true;

// TODO: Learn how to handle Supabase session in SvelteKit
export const load = (async () => {
	const fetchBlogPosts = async (table: string) => {
		try {
			const { data, error } = await supabase
				.from(table)
				.select('*')
				.order('created_at', { ascending: false })
				.limit(10);

			if (error) {
				throw error;
			}

			return data;
		} catch (error) {
			console.log('Error loading blog posts: ', error);
		}
	};

	const [blogPosts, projects] = await Promise.all([
		fetchBlogPosts('posts'),
		fetchBlogPosts('projects')
	]);

	return {
		blogPosts,
		projects,
		session: null
	};
}) satisfies PageServerLoad;
