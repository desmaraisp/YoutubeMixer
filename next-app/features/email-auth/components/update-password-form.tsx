import { FormRootError, SetRootFormError } from "@/components/errors"
import { supabaseBrowserClient } from "@/globals/supabase-client"
import { Card, Stack, TextInput, Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"


type FormType = {
	password: string
	passwordConfirmation: string
}

export function UpdatePasswordForm() {
	const form = useForm<FormType>({
		validate: {
			passwordConfirmation: (value, values) => value !== values.password ? 'Passwords did not match' : null
		}
	})

	const handler = async (data: FormType) => {
		const { error: signUpError } = await supabaseBrowserClient.auth.updateUser({
			password: data.password
		})

		if (signUpError) {
			SetRootFormError(form, signUpError.message)
			return
		}
	}

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
