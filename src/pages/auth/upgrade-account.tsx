import { AuthenticationGuard } from '@/components/auth-components/authentication-guard'
import { UpgradeAnonymousAccount } from '@/components/auth-components/upgrade-anonymous'
import { ClientSideRedirect } from '@/components/clientside-redirect'
import React from 'react'


export default function UpgradeAccountPage() {
	return (
		<AuthenticationGuard
			authenticatedNode={() => <ClientSideRedirect path='/' />}
			anonymousNode={(currentUser) => <UpgradeAnonymousAccount user={currentUser} />}
			unauthenticatedNode={() => <ClientSideRedirect path='/' />}
		/>
	)
}