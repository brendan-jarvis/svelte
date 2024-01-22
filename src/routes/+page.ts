// import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	// const { supabase, session } = await parent();
	const { supabase } = await parent();

	// if (!session) {
	// 	throw redirect(303, '/');
	// }

	const { data: blogPosts } = await supabase.from('posts').select('*');
	const { data: projects } = await supabase.from('projects').select('*');

	return {
		// user: session.user,
		blogPosts,
		projects
	};
};
