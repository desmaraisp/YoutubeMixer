import { EmailSignIn } from '@/features/email-auth/components/sign-in-form'
import { SocialAuth } from '@/features/social-auth/components/display'
import { createSupabaseClientForServerSideProps } from '@/lib/supabase-client-factory';
import { Anchor, Divider } from '@mantine/core'
import { GetServerSideProps } from 'next';
import Link from 'next/link'

export const getServerSideProps = (async (context) => {
	const supabaseClient = createSupabaseClientForServerSideProps(context)

	if (!!(await supabaseClient.auth.getSession()).data.session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return { props: {} }
}) satisfies GetServerSideProps<{}>

export default function AuthPage() {
	return (
		<>
			<SocialAuth />
			<Divider my='lg' />
			<EmailSignIn />
			<Anchor mx='sm' component={Link} href={"/sign-up"}>Don&apos;t have an account?</Anchor>
			<Anchor mx='sm' component={Link} href={"/forgot-password"}>Forgot password?</Anchor>
		</>
	)
}
