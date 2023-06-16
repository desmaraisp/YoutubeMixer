import { useSession } from "next-auth/react";
import {User} from "next-auth"

type authenticationGuardParams = {
	authenticatedNode: (user: User) => JSX.Element;
	unauthenticatedNode: () => JSX.Element;
};


export function AuthenticationGuard({ authenticatedNode, unauthenticatedNode }: authenticationGuardParams): JSX.Element {
	const { data } = useSession()
	
	if (!data?.user) return <>{unauthenticatedNode()}</>
	return <>{authenticatedNode( data.user )}</>
}