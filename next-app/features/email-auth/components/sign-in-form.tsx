import { FormRootError, SetRootFormError } from "@/components/errors"
import { supabaseBrowserClient } from "@/globals/supabase-client"
import { Card, Stack, TextInput, Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"


type FormType = {
	email: string
	password: string
}

export function EmailSignIn() {
	const form = useForm<FormType>()

	const handler = async (data: FormType) => {
		const { error: signInError } = await supabaseBrowserClient.auth.signInWithPassword({
			email: data.email,
			password: data.password
		})

		if (signInError) {
			SetRootFormError(form, signInError.message)
			return
		}
	}

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<TextInput type="email" label="Email" {...form.getInputProps("email")} />
					<PasswordInput label="Password" {...form.getInputProps("password")} />
					<FormRootError errors={form.errors} />
					<Button type='submit'>Sign up</Button>
				</Stack>
			</form>
		</Card>
	)
}
