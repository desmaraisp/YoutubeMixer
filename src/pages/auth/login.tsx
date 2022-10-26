import { AuthenticationGuard } from '@/components/auth-components/authentication-guard'
import { ClientSideRedirect } from '@/components/clientside-redirect'
import React from 'react'
import { Login } from '../../components/auth-components/login'


export default function LoginPage() {
	return (
		<AuthenticationGuard
			authenticatedNode={() => <ClientSideRedirect path='/' />}
			anonymousNode={(user) => <Login user={user} />}
			unauthenticatedNode={() => <Login />} />
	)
}
