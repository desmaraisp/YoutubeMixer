import { clientAuth } from '../../firebase-config'
import { GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth'
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { AuthenticationMenuWidget } from "./authentication-menu-widget";
import { roundedSeparator } from "@/styles/shared/separator.css";
import { z } from 'zod';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const loginSchema = z.object({
	password: z
		.string(),
	email: z.string().min(1, { message: "Email is required" }).email({
		message: "Must be a valid email",
	})
})
type LoginSchema = z.infer<typeof loginSchema>


async function onEmailLogin(data: LoginSchema, router: NextRouter, form: UseFormReturn<LoginSchema, any>) {
	try {
		await signInWithEmailAndPassword(clientAuth, data.email, data.password)
	}
	catch (error) {
		if (error instanceof Error) {
			form.setError('root', { message: error.message });
			return
		}

		throw error
	}
	router.push("/")
}




export function Login({ user }: { user?: User }) {

	return (
		<AuthenticationMenuWidget title="Login">
			<hr style={{ width: "100%" }} className={roundedSeparator} />

			<LoginInternal user={user} />

			<hr style={{ width: "100%" }} className={roundedSeparator} />
			<Link href="/">Back</Link>

		</AuthenticationMenuWidget>
	)
}

function LoginInternal({ user }: { user: User | undefined }) {
	const router = useRouter()
	const form = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

	const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
		await onEmailLogin(data, router, form)
	}

	if (!user) {
		return <>
			<LoginForm form={form} onSubmit={onSubmit} />
			<AnonymousLoginButton router={router} />
			<GoogleLoginButton router={router} />
		</>;

	}

	return <>
		<LoginForm form={form} onSubmit={onSubmit} />
		<GoogleLoginButton router={router} />
	</>;
}
function AnonymousLoginButton({ router }: { router: NextRouter }) {
	const [err, setErr] = useState<string | null>(null)

	return (
		<>
			<button type="submit" onClick={async () => {
				try{
					await signInAnonymously(clientAuth)
				}
				catch(e){
					if (e instanceof Error) {
						setErr(e.message)
						return
					}
					throw e
				}
				router.push("/");
			}}>Login with anonymous user</button>
			{
				err && <p>{err}</p>
			}
		</>
	)
}
function GoogleLoginButton({ router }: { router: NextRouter }) {
	const [err, setErr] = useState<string | null>(null)

	return (
		<>
			<button type="submit" onClick={async () => {
				const provider = new GoogleAuthProvider();
				try{
					await signInWithPopup(clientAuth, provider)
				}
				catch(e){
					if (e instanceof Error) {
						setErr(e.message)
						return
					}
					throw e
				}
				router.push("/");
			}}>Login with Google</button>
			{
				err && <p>{err}</p>
			}
		</>
	)
}

function LoginForm({ form, onSubmit }: { form: UseFormReturn<LoginSchema, any>; onSubmit: SubmitHandler<LoginSchema>; }) {
	return <form className={flexboxVariants.centered} style={{ flexDirection: 'column' }} onSubmit={form.handleSubmit(onSubmit)}>
		<input placeholder="Email" type="text" id="email" {...form.register("email")} />
		{
			form.formState.errors.email && <p>{form.formState.errors.email?.message}</p>
		}

		<input placeholder="Password" type="password" id="password" {...form.register("password")} />
		{
			form.formState.errors.password && <p>{form.formState.errors.password?.message}</p>
		}

		<button type="submit">Login</button>
		{
			form.formState.errors.root && <p>{form.formState.errors.root.message}</p>
		}
	</form>
}
