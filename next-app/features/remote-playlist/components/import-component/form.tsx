import { FormRootError, SetRootFormError } from "@/components/errors";
import { isApiError } from "@/lib/api-error-response";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { GetRemotePlaylistContents } from "./fetcher";
import { Button, Card, Select, Stack, TextInput } from "@mantine/core";
import { AllowedPlaylistTypes } from "@/lib/playlist-type-enum";
import { RemotePlaylistModel, RemotePlaylistModelWithDetails, RemotePlaylistSchema } from "../../remote-playlist-schema";

export function RemotePlaylistForm({ onRemotePlaylistDataReceived }: { onRemotePlaylistDataReceived: (data: RemotePlaylistModelWithDetails) => void }) {
	const router = useRouter();
	const form = useForm<RemotePlaylistModel>({
		validate: zodResolver(RemotePlaylistSchema),
		initialValues: {
			playlistType: 'Spotify',
			remotePlaylistId: '',
		}
	})

	const handler = async (data: RemotePlaylistModel) => {
		const result = await GetRemotePlaylistContents(data)

		if (isApiError(result)) {
			SetRootFormError(form, result.message)
			return
		}

		onRemotePlaylistDataReceived(result)
	}

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<TextInput label="Playlist Id" {...form.getInputProps("remotePlaylistId")} />
					<Select
						clearable
						{...form.getInputProps(`playlistType`)}
						data={AllowedPlaylistTypes}
					/>

					<FormRootError errors={form.errors} />
					<Button type='submit'>Submit</Button>
				</Stack>
			</form>
		</Card>
	)
}