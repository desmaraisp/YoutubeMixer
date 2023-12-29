import { SocialAuth } from '@/features/social-auth/components/display'
import { supabaseBrowserClient } from '@/globals/supabase-client'
import { Divider, useMantineColorScheme } from '@mantine/core'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
	)

	if (!!(await supabase.auth.getSession()).data.session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
	return {
		props: {}
	}
}


export default function AuthPage() {
	const { colorScheme } = useMantineColorScheme()
	const isDarkTheme = colorScheme === 'dark'

	return (
		<>
			<SocialAuth providers={['google', 'facebook', 'twitter', 'apple', 'github', 'gitlab', 'linkedin', 'spotify', 'twitch']} />
			<Divider my='lg' />
			<Auth
				supabaseClient={supabaseBrowserClient}
				appearance={{
					theme: ThemeSupa
				}}
				providers={[]}
				dark={isDarkTheme}
			/>
		</>
	)
}
