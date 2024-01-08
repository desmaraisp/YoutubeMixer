import { SupabaseContext } from "@/features/supabase-helpers/supabase-client-context-provider"
import { IconDefinition, faApple, faBitbucket, faDiscord, faFacebook, faGithub, faGitlab, faGoogle, faLinkedin, faSlack, faSpotify, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Stack, Text } from "@mantine/core"
import { ProviderScopes } from "@supabase/auth-ui-shared"
import { Provider } from "@supabase/supabase-js"
import { useCallback, useContext, useState } from "react"

interface SocialAuthProps {
	providers?: Provider[]
	providerScopes?: Partial<ProviderScopes>
	queryParams?: { [key: string]: string }
	redirectTo?: undefined | string
}

export const ProviderIcon = ({ provider }: { provider: Provider }) => {
	let icon: IconDefinition

	if (provider == 'google') icon = faGoogle;
	else if (provider == 'facebook') icon = faFacebook;
	else if (provider == 'twitter') icon = faTwitter;
	else if (provider == 'apple') icon = faApple;
	else if (provider == 'github') icon = faGithub;
	else if (provider == 'gitlab') icon = faGitlab;
	else if (provider == 'bitbucket') icon = faBitbucket;
	else if (provider == 'discord') icon = faDiscord;
	else if (provider == 'linkedin') icon = faLinkedin;
	else if (provider == 'slack') icon = faSlack;
	else if (provider == 'spotify') icon = faSpotify;
	else if (provider == 'twitch') icon = faTwitch;
	else throw new Error(`Provider ${provider} isn't implemented`)

	return <FontAwesomeIcon icon={icon} />
}

export function SocialAuth({
	providers = ['google', 'facebook', 'twitter', 'apple', 'github', 'gitlab', 'linkedin', 'spotify', 'twitch'],
	providerScopes,
	queryParams,
	redirectTo,
}: SocialAuthProps) {
	const [loading, setLoading] = useState(false)
	const { supabaseAuthClient } = useContext(SupabaseContext)

	const handleProviderSignIn = useCallback(async (provider: Provider) => {
		setLoading(true)
		const { error } = await supabaseAuthClient.signInWithOAuth({
			provider,
			options: {
				redirectTo,
				scopes: providerScopes?.[provider],
				queryParams,
			},
		})
		if (error) throw error
		setLoading(false)
	}, [providerScopes, queryParams, redirectTo, supabaseAuthClient])

	return (
		<>
			{providers && providers.length > 0 && (
				<Stack gap="md">
					{providers.map((provider: Provider) => {
						return (
							<Button
								fullWidth
								key={provider}
								loading={loading}
								variant="default"
								leftSection={<ProviderIcon provider={provider} />}
								onClick={() => handleProviderSignIn(provider)}
							>
								<Text w={'150px'}>{provider}</Text>
							</Button>
						)
					})}
				</Stack>
			)}
		</>
	)
}