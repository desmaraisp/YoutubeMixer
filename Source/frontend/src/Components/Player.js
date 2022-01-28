import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentIndex, setVideosList } from '../Store/Player_Manager/Player_Manager'
import ReactPlayer from 'react-player/youtube'


export function Fetch_Videos_From_API() {
    const saved_playlists = useSelector((state) => state.saved_slaylists_reducer);

    var FormattedString = saved_playlists.values.join("&PlaylistID=");

    const response = await fetch("/api/Get_Combined_Playlist_Contents_From_Request" + "?PlaylistID=" + FormattedString);

}

function PlayerVideoItem({ Video, ElementIndex }) {
    const dispatch = useDispatch()

    return (
        <tr>
            <td>
                <span onClick={() => {
                    dispatch(setCurrentIndex(ElementIndex))
                }} >
                    {Video.Title}
                </span>
            </td>
        </tr>
    );
}


function Current_Video_Done(player_state, dispatch) {
    if (player_state.Current_Index + 1 === player_state.Videos.length) {
        dispatch(setCurrentIndex(0))
    }
    else {
        dispatch(setCurrentIndex(player_state.Current_Index + 1))
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
    const player_state = useSelector((state) => state.player_reducer);

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
