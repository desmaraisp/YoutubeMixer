import { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addPlaylist, remove_Nth_Playlist, Set_Playlist_Menu_Value } from '../Store/Playlist_Manager/Playlist_Manager'
import { SavePlaylists } from '../Store/Playlist_Manager/Saved_Playlists_Manager'
import { Fetch_Videos_From_API } from './Player'

function PLaylistsMenuItem({ Playlist, ElementIndex }) {
    const dispatch = useDispatch()

    return (
        <tr>
            <td>
                <div>{Playlist}</div>
            </td>
            <td>
                <button onClick={
                    () => {
                        dispatch(remove_Nth_Playlist(ElementIndex))
                    }
                } type="button">Remove Playlist</button>
            </td>
        </tr>
    );
}


function PLaylistsMenuInput() {
    const dispatch = useDispatch()
    const inputref = useRef();
    const playlists = useSelector((state) => state.playlists_reducer);

    return (
        <tr>
            <td>
                <input ref={inputref} placeholder="Playlist ID" type="text" />
            </td>
            <td>
                <button onClick={
                    () => {
                        dispatch(addPlaylist( inputref.current.value ))
                        inputref.current.value = ''
                    }
                } type="button">Add Playlist</button>

                <button type="button" onClick={
                    () => {
                        dispatch(SavePlaylists(
                            playlists.values
                        ))
                        Fetch_Videos_From_API();
                    }}
                >Save Changes</button>
            </td>
        </tr>
    );
}

export function PLaylistsMenu() {
    const playlists = useSelector((state) => state.playlists_reducer);
    const saved_playlists = useSelector((state) => state.saved_playlists_reducer);
    const dispatch = useDispatch()

    const Set_Playlist_Menu_Value_callback = useCallback(() => {
        dispatch(Set_Playlist_Menu_Value(saved_playlists.values))
    }, [dispatch, saved_playlists])

    useEffect(() => {
        Set_Playlist_Menu_Value_callback();
    }, [Set_Playlist_Menu_Value_callback])

    return (
        <table><tbody>
            {
                playlists.values.map((playlist, index) => {
                    return <PLaylistsMenuItem key={playlist.UUID} Playlist={playlist.PlaylistID} ElementIndex={index} />
                })
            }

            <PLaylistsMenuInput />

        </tbody></table>
    );
}
