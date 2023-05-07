import { PlaylistModel } from '@/models/playlist-model';
import React from 'react';
import { flexboxVariants } from '@/styles/shared/flexbox.css';

export function ConfirmationPrompt({ onAcceptPlaylist, onRejectPlaylist, Playlist }: { Playlist: PlaylistModel; onAcceptPlaylist: () => void; onRejectPlaylist: () => void; }) {
	return (
		<>
			<p>{Playlist.playlistItems.length} items found.</p>
			<div className={flexboxVariants.gapped}>
				<button type='button' onClick={onAcceptPlaylist}>
					Accept
				</button>
				<button type='button' onClick={onRejectPlaylist}>Reject</button>

			</div>
		</>
	);
}
