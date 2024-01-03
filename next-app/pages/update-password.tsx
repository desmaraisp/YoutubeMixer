import { UpdatePasswordForm } from '@/features/email-auth/components/update-password-form'
import { createSupabaseClientForServerSideProps } from '@/lib/supabase-client-factory'
import { Anchor } from '@mantine/core'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

export const getServerSideProps = (async (context) => {
	const supabaseClient = createSupabaseClientForServerSideProps(context)

	const session = (await supabaseClient.auth.getSession()).data.session
	if (!session) {
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
			<UpdatePasswordForm />
			<Anchor mx='sm' component={Link} href={"/sign-in"}>Back to sign in</Anchor>
		</>
	)
}
