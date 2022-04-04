import ReactPlayer from 'react-player'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentIndex, setVideosList } from '../../Store/Player_Manager/Player_Manager'
import { store } from '../../Store/Store'
import { PlayerTableRow, Thumbnail, ThumbnailCell,
    VideoTitleCell, IframeWrapper,
    VideosTable, PlayerMenuStyle } from './Player.style'
import { ScrollTableBody } from '../../Shared Styles/General styles'
import {PlayerHeader} from './PlayerTitleHeader'

class SwallowingErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {

    }
  
    render() {
      return this.props.children; 
    }
}

export function Fetch_Videos_From_API() {
    const saved_playlists = store.getState().Saved_Playlists_reducer
    const ctrl = new AbortController();
    let isMounted = true;

    const fetcher = async () => {
        try {
            let PlaylistIDs_List = []
            for (const playlist_Dict of saved_playlists.values) {
                PlaylistIDs_List = PlaylistIDs_List.concat( playlist_Dict.PlaylistID)
            }
            var FormattedString = PlaylistIDs_List.join("&PlaylistID=");

            const response = await fetch(
                "/api/Get_Combined_Playlist_Contents_From_Request?PlaylistID=" + FormattedString, { signal: ctrl.signal }
                );
            
            const data = await response.json();
            isMounted && store.dispatch(setVideosList(data.Contents))
            isMounted && store.dispatch(setCurrentIndex(0))  
            
        } 
        catch (err) {
          console.log(err);
        }
    };

    fetcher();

    return () => {
        isMounted = false
        ctrl.abort();
    };
}

function PlayerVideoItem({ Video, ElementIndex }) {
    const dispatch = useDispatch()
    const CurrentIndex = store.getState().Player_reducer.Current_Index
    const elementRef = useRef()
    const SkipUseEffect = useRef(true)


    useEffect(()=>{
        if(SkipUseEffect.current){
            SkipUseEffect.current = false
            return
        }
        if(CurrentIndex === ElementIndex){
            let OffsetToParent = -50
            let CurrentIterationElement = elementRef.current
            while(CurrentIterationElement.previousElementSibling){
                CurrentIterationElement = CurrentIterationElement.previousElementSibling
                OffsetToParent += CurrentIterationElement.offsetHeight
            }
    
            elementRef.current.parentElement.scrollTo(0,OffsetToParent)
        }
    })


    return (
        <PlayerTableRow ref={elementRef} isCurrentlyPlaying={CurrentIndex === ElementIndex} onClick={() => {
            dispatch(setCurrentIndex(ElementIndex))
        }} >
            <ThumbnailCell>
                <SwallowingErrorBoundary>
                    <Thumbnail alt={"icon"} src={`https://i.ytimg.com/vi/${Video.VideoID}/hqdefault.jpg`} />
                </SwallowingErrorBoundary>
            </ThumbnailCell>
            <VideoTitleCell>
                {Video.Title}
            </VideoTitleCell>
        </PlayerTableRow>
    );
}

function VideoPlayerFrame() {
    const player_state = useSelector((state) => state.Player_reducer);
    const [isDone, setisDone] = useState(false);
    const SkipUseEffect = useRef(true)

    useEffect(()=>{
        if(SkipUseEffect.current){
            SkipUseEffect.current = false
            return
        }
        else{
            setisDone(false)
            SkipUseEffect.current = true
            const CurrentPlayerState = store.getState().Player_reducer
            if (CurrentPlayerState.Current_Index + 1 === CurrentPlayerState.Videos.length) {
                Fetch_Videos_From_API()
            }
            else {
                store.dispatch(setCurrentIndex(CurrentPlayerState.Current_Index + 1))
            }
        }
    }, [isDone])

    const CurrentURL = "https://www.youtube.com/watch?v=" + (player_state.Videos[player_state.Current_Index]).VideoID
    return (
        <IframeWrapper>
            <ReactPlayer width='100%' url={CurrentURL} controls={true} playing={true} onReady={
                (player) => {
                    if (player.getDuration() === 0) {
                        setisDone(true)
                    }
                }
            } onEnded={
                () => {
                    setisDone(true)
                }
            } />
        </IframeWrapper>
    );

}


export function PlayerMenu() {
    let player_state = useSelector((state) => state.Player_reducer);
    const PlayerIsHidden = player_state.Videos.length === 0

    if (!PlayerIsHidden) {
        document.title = player_state.Videos[player_state.Current_Index].Title
    }
    else {
        document.title = "Youtube Randomizer"
        return (<></>)
    }


    return (
        <PlayerMenuStyle >

            <VideoPlayerFrame />
            <VideosTable>
                <thead>
                    <PlayerHeader />
                </thead>
                <ScrollTableBody heigth='350px'>
                {
                    player_state.Videos.map((video, index) => {
                        return <PlayerVideoItem key={video.UUID} Video={video} ElementIndex={index} />
                    })
                }
                </ScrollTableBody>
            </VideosTable>
        </PlayerMenuStyle>
    );
}
