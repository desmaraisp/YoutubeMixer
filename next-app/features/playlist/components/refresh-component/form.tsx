import { FormRootError, SetRootFormError } from "@/components/errors";
import { isApiError } from "@/lib/api-error-response";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { UpdatePlaylist } from "./fetcher";
import { Button, Card, Stack, Text } from "@mantine/core";
import { PlaylistModelWithId } from "../../playlist-schema";
import { RemotePlaylistModelWithDetails } from "@/features/remote-playlist/remote-playlist-schema";

type FromPropsType = {
	newPlaylistData: RemotePlaylistModelWithDetails;
	currentPlaylistData: PlaylistModelWithId;
	cancelCallback: () =>  void
};

export function AcceptPlaylistUpdateForm({ newPlaylistData, currentPlaylistData, cancelCallback }: FromPropsType) {
	const router = useRouter();
	const form = useForm()

	const handler = async () => {
		const result = await UpdatePlaylist({
			...currentPlaylistData,
			playlistName: newPlaylistData.playlistName,
			playlistItems: newPlaylistData.playlistItems
		})

		if (isApiError(result)) {
			SetRootFormError(form, result.message)
			return
		}

		form.reset()
		router.replace(router.asPath);
	}

	return (
		<Card withBorder>
			<form onSubmit={form.onSubmit(handler)}>
				<Stack>
					<Text>
						{
							`Refreshing ${currentPlaylistData.playlistType} playlist ${currentPlaylistData.playlistName}`
						}
					</Text>
					<Text>
						{
							`${newPlaylistData.playlistItems.length} tracks found`
						}
					</Text>

					<FormRootError errors={form.errors} />
					<Button type='submit'>Accept new playlist</Button>
					<Button type='reset' onClick={cancelCallback}>Cancel</Button>
				</Stack>
			</form>
		</Card>
	)
}