import { CookieOptions, createServerClient, serialize } from "@supabase/ssr";
import { GetServerSidePropsContext } from "next";


export function createSupabaseClientForServerSideProps(context: GetServerSidePropsContext) {
	return createServerClient(
		process.env.PUBLIC_SUPABASE_URL!,
		process.env.PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return context.req.cookies[name];
				},
				set(name: string, value: string, options: CookieOptions) {
					context.res.appendHeader(
						"Set-Cookie",
						serialize(name, value, options)
					);
				},
				remove(name: string, options: CookieOptions) {
					context.res.appendHeader("Set-Cookie", serialize(name, "", options));
				},
			},
		}
	);
}
