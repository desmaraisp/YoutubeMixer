import { User } from "firebase/auth";
import { useContext } from "react";
import { FirebaseAuthContext } from "../firebase-context";

type authenticationGuardParams = {
	authenticatedNode: (user: User) => JSX.Element;
	unauthenticatedNode: () => JSX.Element;
	anonymousNode?: (user: User) => JSX.Element
	treatAnonymousAsAuthenticated?: boolean;
};


export function AuthenticationGuard({ authenticatedNode, unauthenticatedNode, treatAnonymousAsAuthenticated = false, anonymousNode }: authenticationGuardParams): JSX.Element {
	const {user: currentUser, isLoading} = useContext(FirebaseAuthContext)

	
	if(isLoading) return <></>
	if (!currentUser) return <>{unauthenticatedNode()}</>
	if (!currentUser.isAnonymous) return <>{authenticatedNode(currentUser)}</>
	if (currentUser.isAnonymous && anonymousNode) return <>{anonymousNode(currentUser)}</>
	if (currentUser.isAnonymous && treatAnonymousAsAuthenticated) return <>{authenticatedNode(currentUser)}</>
	return <>{unauthenticatedNode()}</>
}