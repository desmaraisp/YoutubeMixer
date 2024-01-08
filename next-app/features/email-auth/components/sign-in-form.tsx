import { FormRootError, SetRootFormError } from "@/components/errors"
import { SupabaseContext } from "@/features/supabase-helpers/supabase-client-context-provider"
import { Card, Stack, TextInput, Button, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import { useContext } from "react"


type FormType = {
	email: string
	password: string
}

export function EmailSignIn() {
	const form = useForm<FormType>()
	const router = useRouter()
	const { supabaseAuthClient } = useContext(SupabaseContext)

	const handler = async (data: FormType) => {
		const { error: signInError } = await supabaseAuthClient.signInWithPassword({
			email: data.email,
			password: data.password
		})

		if (signInError) {
			SetRootFormError(form, signInError.message)
			return
		}

		router.reload()
	}

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<TextInput type="email" label="Email" {...form.getInputProps("email")} />
					<PasswordInput label="Password" {...form.getInputProps("password")} />
					<FormRootError errors={form.errors} />
					<Button type='submit'>Sign in</Button>
				</Stack>
			</form>
		</Card>
	)
}
