import { ForgotPasswordForm } from '@/features/email-auth/components/forgot-password-form'
import { createSupabaseClientForServerSideProps } from '@/lib/supabase-client-factory'
import { Anchor } from '@mantine/core'
import { GetServerSideProps } from 'next'
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
			<ForgotPasswordForm />
			<Anchor mx='sm' component={Link} href={"/sign-in"}>Back to sign in</Anchor>
		</>
	)
}
