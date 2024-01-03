import { ThemeSelector } from '@/components/theme-selector'
import { Anchor, AppShell, Button, Flex, MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@mantine/core/styles.css';
import { NoSsr } from '@/components/no-ssr';
import Link from 'next/link';
import { supabaseBrowserClient } from '@/globals/supabase-client';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

function AuthButton() {
	const [session, setSession] = useState<Session | null>(null)
	const router = useRouter()
	useEffect(() => {
		const fct = async () => {
			const session = (await supabaseBrowserClient.auth.getSession()).data.session;
			setSession(session)
		}
		fct()
	}, [])
	useEffect(() => {
		const unsubscribe = supabaseBrowserClient.auth.onAuthStateChange((event, newSession) => {
			if ((event === 'SIGNED_IN' || event === 'SIGNED_OUT') && session?.user.id !== newSession?.user.id) {
				router.reload()
			}
		})
		return unsubscribe.data.subscription.unsubscribe
	}, [router, session])

	if (!session) return <Anchor mx='sm' underline='never' component={Link} href={"/sign-in"}>Sign in</Anchor>

	return <Button onClick={async () => await supabaseBrowserClient.auth.signOut()}>Sign Out</Button>
}

export default function App({ Component, pageProps, router }: AppProps) {
	if (router.pathname === '/swagger-ui') {
		return <Component {...pageProps} />
	}

	return <MantineProvider>
		<AppShell padding="xl">
			<AppShell.Header>
				<Flex justify={'space-between'}>
					<Anchor mx='sm' underline='never' component={Link} href={"/"}>Home</Anchor>
					<Anchor mx='sm' underline='never' component={Link} href={"/player"}>Player</Anchor>
					<Anchor mx='sm' underline='never' component={Link} href={"/playlists"}>Playlists</Anchor>
					<NoSsr>
						<AuthButton />
					</NoSsr>
					<NoSsr>
						<ThemeSelector />
					</NoSsr>
				</Flex>
			</AppShell.Header>

			<AppShell.Main>
				<Component {...pageProps} />
			</AppShell.Main>
		</AppShell>
	</MantineProvider>
}
