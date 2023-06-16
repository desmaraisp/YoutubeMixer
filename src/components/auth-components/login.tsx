import { signIn } from 'next-auth/react';


export function Login() {

	return (
		<>
			<button type="button" onClick={async () => signIn()}>Sign in</button>
		</>
	)
}