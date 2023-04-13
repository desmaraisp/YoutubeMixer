import React from 'react'
import { useAppSelector } from '../store/hooks'
import Link from 'next/link';
import { flexboxVariants } from '@/styles/shared/flexbox.css';
import { centeredText, centeredVariants } from '@/styles/shared/centered-item.css'
import { PlaylistsMenuItem } from './playlists-menu-item';
import { PlaylistLink } from './playlist-menu-controls/playlist-link';


export function PlaylistsDisplay() {
	const playlists = useAppSelector(state => state.playlistsReducer.playlists)

	return (
		<div className={centeredVariants.p90}>
			<h2 className={centeredText}>Current Playlists</h2>

			<div className={flexboxVariants.centered} style={{ gap: "15px", rowGap: "15px", alignItems: "stretch", flexWrap: 'wrap' }}>

				{playlists.map((playlist) => {
					return <PlaylistsMenuItem
						key={playlist.uuid}
						Playlist={playlist}
						controls={
							<PlaylistLink Playlist={playlist} />
						}
					/>
				})}
			</div>



			<div style={{ marginTop: "5px" }} className={flexboxVariants.rightAligned}>
				<Link href="/edit-playlists">
					Edit playlists
				</Link>

			</div>

		</div>
	)
}