import { FormRootError, SetRootFormError } from "@/components/errors"
import { supabaseBrowserClient } from "@/globals/supabase-client"
import { Card, Stack, TextInput, Button } from "@mantine/core"
import { useForm } from "@mantine/form"


type FormType = {
	email: string
}

export function ForgotPasswordForm() {
	const form = useForm<FormType>()

	const handler = async (data: FormType) => {
		const { error: signInError } = await supabaseBrowserClient.auth.resetPasswordForEmail(data.email, {
			redirectTo: "http://localhost:3000/update-password"
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
					<FormRootError errors={form.errors} />
					<Button type='submit'>Send reset instructions</Button>
				</Stack>
			</form>
		</Card>
	)
}
