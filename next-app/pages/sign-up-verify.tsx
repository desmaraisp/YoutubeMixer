import { WrappedWithErrorHandler } from '@/components/errors'
import { SupabaseContext } from '@/features/supabase-helpers/supabase-client-context-provider'
import { createSupabaseClientForServerSideProps } from '@/lib/supabase-client-factory'
import { Button, Card, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

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
	return <Card withBorder>
		<WrappedWithErrorHandler >
			<InnerPage />
		</WrappedWithErrorHandler>
	</Card>
}

function InnerPage() {
	const { supabaseAuthClient } = useContext(SupabaseContext)
	const router = useRouter()
	const [visible, { open, close }] = useDisclosure(false);
	const { showBoundary } = useErrorBoundary();
	const { email } = router.query

	const resendHandler = useCallback(async () => {
		open()
		const { error } = await supabaseAuthClient.resend({
			type: "signup",
			email: Array.isArray(email) ? email[0] : email ?? "",
		})

		if (error) {
			showBoundary(error)
			return
		}
		close()
	}, [close, email, open, showBoundary, supabaseAuthClient])

	return (
		<>
			<Text component='p'>Your account was created, but we still need to confirm your email address before we can log you in.</Text>
			<Button loading={visible} onClick={resendHandler}>Didn&apos;t receive an email?</Button>
		</>
	)
}

