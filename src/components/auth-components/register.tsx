import Link from "next/link";
import { AuthenticationMenuWidget } from "./authentication-menu-widget";
import { roundedSeparator } from "@/styles/shared/separator.css";
import { z } from "zod";
import { NextRouter, useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/firebase-config";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { flexboxVariants } from "@/styles/shared/flexbox.css";

const registerSchema = z.object({
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
interface RegisterSchema extends z.infer<typeof registerSchema> {}


async function onRegister(data: RegisterSchema, router: NextRouter, form: UseFormReturn<RegisterSchema, any>) {
	try {
		await createUserWithEmailAndPassword(clientAuth, data.email, data.password)
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

export function Register() {
	const form = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })
	const router = useRouter()

	const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
		await onRegister(data, router, form)
	}

	return (
		<AuthenticationMenuWidget title="Register">
			<hr style={{ width: "100%" }} className={roundedSeparator} />

			<EmailRegisterForm form={form} onSubmit={onSubmit} />

			<hr style={{ width: "100%" }} className={roundedSeparator} />
			<Link href="/">Back</Link>
		</AuthenticationMenuWidget>
	)
}

function EmailRegisterForm({ form, onSubmit }: { form: UseFormReturn<RegisterSchema, any>; onSubmit: SubmitHandler<RegisterSchema>; }) {
	return <form className={flexboxVariants.centered} style={{ flexDirection: 'column' }} onSubmit={form.handleSubmit(onSubmit)}>
		<input placeholder="Email" type="text" id="email" {...form.register("email")} />
		{form.formState.errors.email && <p>{form.formState.errors.email?.message}</p>}

		<input placeholder="Password" type="password" id="password" {...form.register("password")} />
		{form.formState.errors.password && <p>{form.formState.errors.password?.message}</p>}

		<input placeholder="Confirm password" type="password" id="confirmPassword" {...form.register("confirmPassword")} />
		{form.formState.errors.confirmPassword && <p>{form.formState.errors.confirmPassword?.message}</p>}

		<button type="submit">Register</button>
		{form.formState.errors.root && <p>{form.formState.errors.root.message}</p>}

	</form>;
}
