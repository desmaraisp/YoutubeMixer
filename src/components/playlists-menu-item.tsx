import { PlaylistModel } from '@/models/playlist-model';
import { ReactNode } from 'react';
import { greyedOut } from '@/styles/shared/greyed-out.css';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { borderedPadded } from '@/styles/shared/bordered-padded.css';
import { fullWidth } from '@/styles/shared/full-size.css';

export function PlaylistsMenuItem({ Playlist, controls }: { Playlist: PlaylistModel, controls: ReactNode }) {
	const baseClassName = `${flexboxVariants.gapped} ${borderedPadded}`;

	return (
		<div style={{ width: "45%", minWidth: "355px" }} className={Playlist.enabled ? baseClassName : `${greyedOut} ${baseClassName}`}>
			<div style={{ width: '100px', borderRadius: "13px", overflow: 'hidden', flexShrink: 0, margin: 'auto' }}>
				<a target='_blank' href={Playlist.playlistURL}>
					<img className={fullWidth} src={Playlist.playlistImage} />
				</a>
			</div>
			<div style={{ flexGrow: 1, padding: "10px 0px" }}>
				<div>
					{Playlist.playlistName}
				</div>
				<div>
					{Playlist.playlistItems.length} tracks
				</div>
			</div>
			<div style={{ paddingRight: "10px", gap: "7px" }} className={`${flexboxVariants.centered}`}>
				{controls}
			</div>

		</div>
	);
}


