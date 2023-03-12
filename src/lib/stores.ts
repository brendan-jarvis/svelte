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
