import { FormRootError, SetRootFormError } from "@/components/errors"
import { SupabaseContext } from "@/features/supabase-helpers/supabase-client-context-provider"
import { Card, Stack, TextInput, Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"


type FormType = {
	email: string
	password: string
	passwordConfirmation: string
}

export function EmailSignUp() {
	const form = useForm<FormType>({
		validate: {
			passwordConfirmation: (value, values) => value !== values.password ? 'Passwords did not match' : null
		}
	})
	const { supabaseAuthClient } = useContext(SupabaseContext)
	const router = useRouter()

	const handler = useCallback(async (data: FormType) => {
		const { error: signUpError } = await supabaseAuthClient.signUp({
			email: data.email,
			password: data.password
		})

		if (signUpError) {
			SetRootFormError(form, signUpError.message)
			return
		}

		router.reload()
	}, [form, router, supabaseAuthClient])

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<TextInput type="email" label="Email" {...form.getInputProps("email")} />
					<PasswordInput label="Password" {...form.getInputProps("password")} />
					<PasswordInput label="Confirm password" {...form.getInputProps("passwordConfirmation")} />
					<FormRootError errors={form.errors} />
					<Button type='submit'>Sign up</Button>
				</Stack>
			</form>
		</Card>
	)
}
