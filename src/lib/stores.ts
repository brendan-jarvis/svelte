import { writable } from 'svelte/store';

interface BlogPost {
	id: string | number;
	author: string;
	title: string;
	content: string;
	created_at: string | number;
	updated_at: string | number;
}

export const blogStore = writable<BlogPost[]>([]);

import { supabase } from '$lib/supabaseClient';

export let loadingBlogPosts = false;

export const fetchBlogPosts = async () => {
	try {
		loadingBlogPosts = true;
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.limit(10)
			.order('created_at', { ascending: false })
			.then(({ data, error }) => ({ data, error }));

		if (error) {
			throw error;
		}

		blogStore.set(data);
	} catch (error) {
		console.log('Error loading blog posts: ', error);
	} finally {
		loadingBlogPosts = false;
	}
};
