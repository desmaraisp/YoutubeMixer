import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentIndex, setVideosList } from '../Store/Player_Manager/Player_Manager'
import ReactPlayer from 'react-player/youtube'
import { store } from '../Store/Store'

export function Fetch_Videos_From_API() {
    const saved_playlists = store.getState().saved_playlists_reducer
    let PlaylistIDs_List = []
    for (const playlist_Dict of saved_playlists.values) {
        PlaylistIDs_List = PlaylistIDs_List.concat( playlist_Dict.PlaylistID)
    }
    var FormattedString = PlaylistIDs_List.join("&PlaylistID=");

    fetch("/api/Get_Combined_Playlist_Contents_From_Request?PlaylistID=" + FormattedString)
        .then(response => response.json())
        .then(data => {
            store.dispatch(setVideosList(data.Contents))
            store.dispatch(setCurrentIndex(0))
        });
}

function PlayerVideoItem({ Video, ElementIndex }) {
    const dispatch = useDispatch()
    const CurrentIndex = store.getState().player_reducer.Current_Index


    return (
        <tr id={ (CurrentIndex === ElementIndex ? 'CurrentlyPlayingVideo' : '') } className={"onclick_Hover"} onClick={() => {
            dispatch(setCurrentIndex(ElementIndex))
        }} >
            <td className="thumbnail_cell">
                <img className={"video_thumbnail"} alt={"icon"} src={`https://i.ytimg.com/vi/${Video.VideoID}/hqdefault.jpg`} />
            </td>
            <td>
                <span className="VideoTitle">
                    {Video.Title}
                </span>
            </td>
        </tr>
    );
}


function Current_Video_Done(player_state) {
    if (player_state.Current_Index + 1 === player_state.Videos.length) {
        Fetch_Videos_From_API()
    }
    else {
        store.dispatch(setCurrentIndex(player_state.Current_Index + 1))
    }
}

function VideoPlayerFrame() {
    const player_state = useSelector((state) => state.player_reducer);
    const dispatch = useDispatch()

    if (player_state.Videos.length === 0) {
        return (<div />);
    }

    const CurrentURL = "https://www.youtube.com/watch?v=" + (player_state.Videos[player_state.Current_Index]).VideoID

    return (
        <ReactPlayer width="40vw" url={CurrentURL} controls={true} onReady={
            (player) => {
                if (player.getDuration() === 0) {
                    Current_Video_Done(player_state, dispatch)
                }
            }
        } playing={true} onEnded={
            () => {
                Current_Video_Done(player_state, dispatch)
            }
        } />
    );

}


export function PlayerMenu() {
    let player_state = useSelector((state) => state.player_reducer);

    useEffect(() => {
        if (player_state.Videos.length !== 0) {
            document.title = player_state.Videos[player_state.Current_Index].Title
        }
        else {
            document.title = "Youtube Mixer"
        }
    })




    return (
        <div className="video_Player">
            <VideoPlayerFrame />

            <div className="table_scroll">
                <table className="videos_table"><tbody>
                {
                    player_state.Videos.map((video, index) => {
                        return <PlayerVideoItem key={video.UUID} Video={video} ElementIndex={index} />
                    })
                }
            </tbody></table>
            </div>
        </div>
    );
}
