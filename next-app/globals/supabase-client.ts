import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseClientSingleton = () => {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
}

const globalForSupabase = globalThis as unknown as {
	supabaseBrowserClient: SupabaseClient<any, "public", any> | undefined
}

export const supabaseBrowserClient = globalForSupabase.supabaseBrowserClient ?? supabaseClientSingleton()