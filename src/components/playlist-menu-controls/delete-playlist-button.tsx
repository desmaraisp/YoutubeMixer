import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { unStyledButton } from '@/styles/shared/button.css';
import { fullHeight } from '@/styles/shared/full-size.css';

export function DeletePlaylistButton({ deleteHandler }: { deleteHandler: () => void; }) {
	return (
		<button style={{ height: "20px" }} className={unStyledButton} type='button'
			onClick={deleteHandler}>
			<FontAwesomeIcon className={fullHeight} icon={faTrash} />
		</button>
	);
}
