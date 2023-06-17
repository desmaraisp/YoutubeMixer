import { ConnectAccount } from '../../components/auth-components/connect-account'
import React from 'react'
import { User, getServerSession } from 'next-auth'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAuthOptions } from '@/auth-options'

export const getServerSideProps: GetServerSideProps<{user: User}> = async (context) => {
	const session = await getServerSession(context.req, context.res, getAuthOptions())
	if (!session?.user?.id) {
		return {
			redirect: {
				permanent: false,
				destination: "/api/auth/signin",
			},
			props: {}
		}
	}
	return {
		props: {
			user: session.user
		}
	}
}
export default function LinkExternalAccountPage({
	user
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<ConnectAccount user={user} />
	)
}