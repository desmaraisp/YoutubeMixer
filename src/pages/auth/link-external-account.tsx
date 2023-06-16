import { AuthenticationGuard } from '@/components/auth-components/authentication-guard'
import { ConnectAccount } from '../../components/auth-components/connect-account'
import React from 'react'
import { ClientSideRedirect } from '../../components/clientside-redirect'

export default function LinkExternalAccountPage() {
	return (
		<AuthenticationGuard
			authenticatedNode={(currentUser) => <ConnectAccount user={currentUser}/>}
			unauthenticatedNode={() => <ClientSideRedirect path='/' />}
		/>
	)
}