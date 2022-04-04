import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Add_Playlist_To_Unsaved_Playlists, Remove_nth_Playlist_From_Unsaved_Playlists, Set_Unsaved_Playlists_Value } from '../../Store/Playlists_Manager/Unsaved_Playlists_Manager'
import { SavePlaylists } from '../../Store/Playlists_Manager/Saved_Playlists_Manager'
import { Fetch_Videos_From_API } from '../Player/Player'
import React from 'react';

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
                        dispatch(Remove_nth_Playlist_From_Unsaved_Playlists(ElementIndex))
                    }
                } type="button">Remove Playlist</button>
            </td>
        </tr>
    );
}

function AddInputValueToUnsavedPlaylistsButton({InputValue, SetInputValue}){
    const dispatch = useDispatch()


    return(
        <button disabled={InputValue === ''} type="button" onClick={
            () => {
                dispatch(Add_Playlist_To_Unsaved_Playlists( InputValue ))
                SetInputValue('')
            }
        }>Add Playlist</button>
    )


}
    

function CommitPlaylistChanges(){
    const dispatch = useDispatch()
    const Unsaved_Playlists = useSelector((state) => state.Unsaved_Playlists_reducer);
    const Saved_Playlists = useSelector((state) => state.Saved_Playlists_reducer);
    const notInitialRender = useRef(false)

    useEffect(() => {
        if (notInitialRender.current) {
            Fetch_Videos_From_API();
        } else {
            notInitialRender.current = true
        }
    }, [Saved_Playlists])

    return(
        <button type="button" disabled={ JSON.stringify( Unsaved_Playlists.values ) === JSON.stringify( Saved_Playlists.values ) } onClick={
            () => {
                dispatch(SavePlaylists(
                    Unsaved_Playlists.values
                ))
            }}
        >Save Changes and Reload</button>
    )
}

function PLaylistsMenuInputRow() {
    const [InputValue, SetInputValue] = useState('');
    const dispatch = useDispatch()

    return (
        <tr>
            <td>
                <input value={InputValue} onKeyDown={
                    (e)=>{
                        if(e.code === 'Enter' && InputValue !== ''){
                            dispatch(Add_Playlist_To_Unsaved_Playlists( InputValue ))
                            SetInputValue('')
                        }
                    }} onChange={
                    (event) => {
                        SetInputValue(event.target.value)
                    }
                } placeholder="Playlist ID" type="text" />
            </td>
            <td>
                <AddInputValueToUnsavedPlaylistsButton InputValue={InputValue} SetInputValue={SetInputValue} />
                <CommitPlaylistChanges />
            </td>
        </tr>
    );
}

export function PLaylistsMenu() {
    const Unsaved_Playlists = useSelector((state) => state.Unsaved_Playlists_reducer);
    const Saved_Playlists = useSelector((state) => state.Saved_Playlists_reducer);
    const dispatch = useDispatch()

    const Set_Playlist_Menu_Value_callback = useCallback(() => {
        dispatch(Set_Unsaved_Playlists_Value(Saved_Playlists.values))
    }, [dispatch, Saved_Playlists])

    useEffect(() => {
        Set_Playlist_Menu_Value_callback();
    }, [Set_Playlist_Menu_Value_callback])

    return (
        <table><tbody>
            {
                Unsaved_Playlists.values.map((playlist, index) => {
                    return <PLaylistsMenuItem key={playlist.UUID} Playlist={playlist.PlaylistID} ElementIndex={index} />
                })
            }

            <PLaylistsMenuInputRow />

        </tbody></table>
    );
}
