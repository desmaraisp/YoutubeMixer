import styled, {css} from 'styled-components'
import { onclick_Hover, ImageBlock } from '../../Shared Styles/General styles'


export const PlayerTableRow = styled.tr`
    display: block;
    ${ onclick_Hover }

    &:nth-child(odd) {
        background-color: #282828;
    }
    &:nth-child(even) {
        background-color: #181a1b;
    }

    ${props => props.isCurrentlyPlaying && css`
        background-color: #167dc640 !important;
    `}
`

export const ThumbnailCell = styled.td`
    width: 100px;
`

export const Thumbnail = styled.img`
    ${ ImageBlock }
`

export const VideoTitleCell = styled.td`
    padding: 10px;

`

export const IframeWrapper = styled.div`
    width: 45vw;
`

export const PlayerMenuStyle = styled.div`
    margin: 15px;
    background-color: #1a1a1a;
    justify-content: space-between;
    border-radius: 4px;
    border-style: ridge;
    border-color: gray;
    display: flex;
    align-items: center;
`

export const VideosTable = styled.table`
    border-collapse: collapse;
    padding: 10px;
    width: 45vw;
    border-left: 3px #282828 solid;
`