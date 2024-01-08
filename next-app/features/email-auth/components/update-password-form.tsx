import { FormRootError, SetRootFormError } from "@/components/errors"
import { SupabaseContext } from "@/features/supabase-helpers/supabase-client-context-provider"
import { Card, Stack, TextInput, Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useCallback, useContext } from "react"


type FormType = {
	password: string
	passwordConfirmation: string
}

export function UpdatePasswordForm() {
	const { supabaseAuthClient } = useContext(SupabaseContext)

	const form = useForm<FormType>({
		validate: {
			passwordConfirmation: (value, values) => value !== values.password ? 'Passwords did not match' : null
		}
	})

	const handler = useCallback(async (data: FormType) => {
		const { error: signUpError } = await supabaseAuthClient.updateUser({
			password: data.password
		})

		if (signUpError) {
			SetRootFormError(form, signUpError.message)
			return
		}
	}, [form, supabaseAuthClient])

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<PasswordInput label="Password" {...form.getInputProps("password")} />
					<PasswordInput label="Confirm password" {...form.getInputProps("passwordConfirmation")} />
					<FormRootError errors={form.errors} />
					<Button type='submit'>Change password</Button>
				</Stack>
			</form>
		</Card>
	)
}
