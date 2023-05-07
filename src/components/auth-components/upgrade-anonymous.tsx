import { EmailAuthProvider, GoogleAuthProvider, linkWithCredential, linkWithPopup, User } from 'firebase/auth'
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { AuthenticationMenuWidget } from './authentication-menu-widget';
import { roundedSeparator } from '@/styles/shared/separator.css';
import { z } from 'zod';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { useState } from 'react';

const linkSchema = z.object({
	confirmPassword: z.string(),
	password: z
		.string()
		.min(1, { message: "Password is required" }),
	email: z.string().min(1, { message: "Email is required" }).email({
		message: "Must be a valid email",
	})
}).refine((data) => data.confirmPassword === data.password, {
	path: ["confirmPassword"],
	message: "Password don't match",
})
type LinkSchema = z.infer<typeof linkSchema>


async function onEmailLink(data: LinkSchema, router: NextRouter, form: UseFormReturn<LinkSchema, any>, user: User) {
	const credential = EmailAuthProvider.credential(data.email, data.password);
	try {
		await linkWithCredential(user, credential)
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


export function UpgradeAnonymousAccount({ user }: { user: User }) {
	const router = useRouter()

	return (
		<AuthenticationMenuWidget
			title="Upgrade anonymous account"
			description={<>
				<p>Anonymous accounts are a feature of <a href="https://firebase.google.com/docs/auth#key_capabilities">Firebase</a> that allows you to create a temporary user without providing any information. The temporary user is persisted to your local IndexedDB until you decide to delete it. If you ever decide to upgrade to a regular account, your data will not be lost.</p>

				<p>They have access to the exact same features as regular accounts. There are two possible reasons why you might want to upgrade to a regular account:</p>
				<ul>
					<li>You don&apos;t want to lose your data when clearing the browser data.</li>
					<li>You want to synchronize your data across multiple devices</li>
				</ul>
			</>}
		>
			<hr style={{ width: "100%" }} className={roundedSeparator} />

			<EmailLinkForm user={user} />
			<GoogleUpgradeButton user={user} router={router} />

			<hr style={{ width: "100%" }} className={roundedSeparator} />
			<Link href="/">Back</Link>
		</AuthenticationMenuWidget>
	)
}

function GoogleUpgradeButton({ user, router }: { user: User; router: NextRouter }) {
	const [err, setErr] = useState<string | null>(null)

	return (<>
		<button type="submit" onClick={async () => {
			const provider = new GoogleAuthProvider();

			try {
				await linkWithPopup(user, provider);
			}
			catch (e) {
				if (e instanceof Error) {
					setErr(e.message)
					return
				}
				throw e
			}
			router.push("/");
		}}>Upgrade anonymous account with Google</button>
		{
			err && <p>{err}</p>
		}
	</>)
}

function EmailLinkForm({ user }: { user: User }) {
	const form = useForm<LinkSchema>({ resolver: zodResolver(linkSchema) })
	const router = useRouter()

	const onSubmit: SubmitHandler<LinkSchema> = async (data) => {
		await onEmailLink(data, router, form, user)
	}


	return <form className={flexboxVariants.centered} style={{ flexDirection: 'column' }} onSubmit={form.handleSubmit(onSubmit)}>
		<input placeholder="Email" type="text" id="email" {...form.register("email")} />
		{form.formState.errors.email && <p>{form.formState.errors.email?.message}</p>}

		<input placeholder="Password" type="password" id="password" {...form.register("password")} />
		{form.formState.errors.password && <p>{form.formState.errors.password?.message}</p>}

		<input placeholder="Confirm password" type="password" id="confirmPassword" {...form.register("confirmPassword")} />
		{form.formState.errors.confirmPassword && <p>{form.formState.errors.confirmPassword?.message}</p>}

		<button type="submit">Upgrade with email account</button>
		{form.formState.errors.root && <p>{form.formState.errors.root.message}</p>}

	</form>;
}