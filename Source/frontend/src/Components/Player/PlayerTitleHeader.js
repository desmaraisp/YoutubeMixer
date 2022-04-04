import React from 'react'
import { store } from '../../Store/Store'
import {PlayerHeaderRowStyle, SongTitleParagraphStyle, SongCounterParagraphStyle} from './PlayerTitleHeader.style'

function PlayerHeaderCurrentPlayingVideoInformation(){
    const player_state = store.getState().Player_reducer

    return (
        <>
        
            <SongTitleParagraphStyle>{player_state.Videos[player_state.Current_Index].Title}</SongTitleParagraphStyle>
            <SongCounterParagraphStyle>{player_state.Current_Index + 1}/{player_state.Videos.length}</SongCounterParagraphStyle>
        </>

    )
}

export function PlayerHeader(){

    return(
        <PlayerHeaderRowStyle>
            <PlayerHeaderCurrentPlayingVideoInformation />
        </PlayerHeaderRowStyle>
    )

}