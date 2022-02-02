import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentIndex, setVideosList } from '../Store/Player_Manager/Player_Manager'
import ReactPlayer from 'react-player/youtube'
import { store } from '../Store/Store'

export function Fetch_Videos_From_API() {
    const saved_playlists = store.getState().saved_playlists_reducer
    var FormattedString = saved_playlists.values.join("&PlaylistID=");

    fetch("/api/Get_Combined_Playlist_Contents_From_Request?PlaylistID=" + FormattedString)
        .then(response => response.json())
        .then(data => {
            store.dispatch(setVideosList(data.Contents))
            store.dispatch(setCurrentIndex(0))
        });
}

function PlayerVideoItem({ Video, ElementIndex }) {
    const dispatch = useDispatch()

    return (
        <tr>
            <td className={"onclick_Hover"}>
                <span onClick={() => {
                    dispatch(setCurrentIndex(ElementIndex))
                }} >
                    <img className={"video_thumbnail"} alt={"icon"} src={`https://i.ytimg.com/vi/${Video.VideoID}/hqdefault.jpg`} />
                    <span>
                        {Video.Title}
                    </span>
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
        <ReactPlayer url={CurrentURL} controls={true} playing={true} onEnded={
            () => {
                Current_Video_Done(player_state, dispatch)
            }
        } />
    );

}


export function PlayerMenu() {
    let player_state = useSelector((state) => state.player_reducer);

    return (
        <div>
            <VideoPlayerFrame />

            <table><tbody>
                {
                    player_state.Videos.map((video, index) => {
                        return <PlayerVideoItem key={uuidv4()} Video={video} ElementIndex={index} />
                    })
                }
            </tbody></table>
        </div>
    );
}
