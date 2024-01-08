import { ThemeSelector } from '@/components/theme-selector'
import { Anchor, AppShell, Burger, Flex, MantineProvider } from '@mantine/core'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import '@/styles/globals.css'
import '@mantine/core/styles.css';
import { NoSsr } from '@/components/no-ssr';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { AuthButton } from '../features/header/components/auth-button';
import DefaultApp from 'next/app'
import { SupabaseClientContextProvider } from '@/features/supabase-helpers/supabase-client-context-provider';

App.getInitialProps = async (
	context: AppContext
) => {
	const ctx = await DefaultApp.getInitialProps(context)

	return {
		...ctx,
		PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL!,
		PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY!,
	}
}

export default function App({ Component, pageProps, router, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL }: AppProps & { PUBLIC_SUPABASE_URL: string, PUBLIC_SUPABASE_ANON_KEY: string }) {
	const [opened, { toggle }] = useDisclosure();

	if (router.pathname === '/swagger-ui') {
		return <MantineProvider forceColorScheme='light'><Component {...pageProps} /></MantineProvider>
	}

	return <MantineProvider>
		<SupabaseClientContextProvider PUBLIC_SUPABASE_ANON_KEY={PUBLIC_SUPABASE_ANON_KEY} PUBLIC_SUPABASE_URL={PUBLIC_SUPABASE_URL}>
			<AppShell padding="xl" header={{ height: 40 }} navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened, desktop: !opened },
			}}>
				<AppShell.Header>
					<Flex justify={'end'} align={'center'} gap={'lg'} style={{ height: '100%' }}>
						<Burger
							style={{ marginRight: 'auto' }}
							opened={opened}
							onClick={toggle}
							size="sm"
						/>

						<NoSsr>
							<AuthButton />
						</NoSsr>
						<NoSsr>
							<ThemeSelector />
						</NoSsr>
					</Flex>
				</AppShell.Header>
				<AppShell.Navbar p='md'>
					<Anchor mx='sm' underline='never' component={Link} href={"/"}>Home</Anchor>
					<Anchor mx='sm' underline='never' component={Link} href={"/player"}>Player</Anchor>
					<Anchor mx='sm' underline='never' component={Link} href={"/playlists"}>Playlists</Anchor>
				</AppShell.Navbar>

				<AppShell.Main>
					<Component {...pageProps} />
				</AppShell.Main>
			</AppShell>
		</SupabaseClientContextProvider>
	</MantineProvider>
}
