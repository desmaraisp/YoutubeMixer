import { FormRootError, SetRootFormError } from "@/components/errors";
import { isApiError } from "@/lib/api-error-response";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { PostNewPlaylist } from "./fetcher";
import { Button, Card, Checkbox, Stack, Text } from "@mantine/core";
import { PlaylistModel, PlaylistSchema } from "../../playlist-schema";
import { RemotePlaylistModelWithDetails } from "@/features/remote-playlist/remote-playlist-schema";

type FormPropsType = {
	remotePlaylistData: RemotePlaylistModelWithDetails;
	onCompletedCallback: () => void;
};

export function AcceptPlaylistImportForm({ remotePlaylistData, onCompletedCallback }: FormPropsType) {
	const router = useRouter();
	const form = useForm<PlaylistModel>({
		validate: zodResolver(PlaylistSchema),
		initialValues: {
			enabled: true,
			...remotePlaylistData
		}
	})

	const handler = async (data: PlaylistModel) => {
		const result = await PostNewPlaylist(data)

		if (isApiError(result)) {
			SetRootFormError(form, result.message)
			return
		}

		onCompletedCallback()
		router.replace(router.asPath);
	}

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<Text>
						{
							`Importing a playlist from ${remotePlaylistData.playlistType}`
						}
					</Text>
					<Text>
						{
							`${remotePlaylistData.playlistItems.length} tracks found`
						}
					</Text>

					<Checkbox
						label="Enabled?"
						{...form.getInputProps('enabled', { type: "checkbox" })}
					/>

					<FormRootError errors={form.errors} />
					<Button type='submit'>Accept new playlist</Button>
				</Stack>
			</form>
		</Card>
	)
}