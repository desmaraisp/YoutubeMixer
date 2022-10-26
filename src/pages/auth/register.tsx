import { AuthenticationGuard } from '@/components/auth-components/authentication-guard'
import { ClientSideRedirect } from '@/components/clientside-redirect'
import React from 'react'
import { Register } from '../../components/auth-components/register'


export default function RegisterPage() {
	return (
		<AuthenticationGuard
			authenticatedNode={() => <ClientSideRedirect path='/' />}
			unauthenticatedNode={() => <Register/>}
		/>
	)
}