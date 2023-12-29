import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PlaylistModelWithId } from "../../playlist-schema";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";

export function PlaylistLink({ Playlist }: { Playlist: PlaylistModelWithId }) {
	const icon = Playlist.playlistType === 'Youtube' ? faYoutube : faSpotify;


	return <div style={{ height: "20px" }}>
		<Link target='_blank' href={Playlist.remotePlaylistId}>
			<FontAwesomeIcon icon={icon} />
		</Link>
	</div>;
}