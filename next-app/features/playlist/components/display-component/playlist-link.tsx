import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PlaylistModelWithId } from "../../playlist-schema";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";

const YoutubePrefix="https://www.youtube.com/playlist?list="
const SpotifyPrefix = "https://open.spotify.com/playlist/"

export function PlaylistLink({ Playlist }: { Playlist: PlaylistModelWithId }) {
	const icon = Playlist.playlistType === 'Youtube' ? faYoutube : faSpotify;
	const linkPrefix = Playlist.playlistType === 'Youtube' ? YoutubePrefix : SpotifyPrefix;

	return <div style={{ height: "20px" }}>
		<Link target='_blank' href={`${linkPrefix}${Playlist.remotePlaylistId}`}>
			<FontAwesomeIcon icon={icon} />
		</Link>
	</div>;
}