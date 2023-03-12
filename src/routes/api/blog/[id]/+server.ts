import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (request) => {
	let blogData;

	try {
		const { data, error } = await supabase.from('posts').select('*').eq('id', request.params.id);

		if (error) {
			throw error;
		}

		blogData = { data };
	} catch (error) {
		blogData = { error: 'Something went wrong fetching the blog post from Supabase.' };
		return new Response(JSON.stringify(blogData), { status: 500 });
	}

	return new Response(JSON.stringify(blogData), { status: 200 });
};
