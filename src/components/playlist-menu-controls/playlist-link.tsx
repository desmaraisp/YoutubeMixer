import { PlaylistModel } from "@/models/playlist-model";
import { fullHeight } from "@/styles/shared/full-size.css";
import { combinedThemeVars } from "@/styles/theme/combined-theme-vars";
import { faYoutube, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PlaylistLink({ Playlist }: { Playlist: PlaylistModel }) {
	const icon = Playlist.playlistType === 'Youtube' ? faYoutube : faSpotify;


	return <div style={{ height: "20px" }}>
		<a style={{ color: combinedThemeVars.textColor }} className={fullHeight} target='_blank' href={Playlist.playlistURL}>
			<FontAwesomeIcon className={fullHeight} icon={icon} />
		</a>
	</div>;
}