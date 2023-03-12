// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';

declare global {
	declare namespace App {
		interface Supabase {
			// Use the path to where you generated the types using the Supbase CLI.
			Database: import('../types/supabase').Database;
			SchemaName: 'public';
		}

		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
