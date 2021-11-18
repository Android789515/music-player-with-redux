import React, { useState } from 'react'

import styles from '../../css/modules/media-player/MediaControls.module.scss'
import '../../css/media-styles/media-controls-styles.scss'

import { pause, play, toggleLoop, toggleShuffle, updateTime } from '../../reducers/mediaSlice'

import MediaControlBtn from './MediaControlBtn'
import BarComponent from './BarComponent'
import VolumeBtn from './VolumeBtn'

function MediaControls(props) {
    const [ btnTheme, setBtnTheme ] = useState('dark')

    const songTime = props.media.time
    const rewind = () => props.dispatch(updateTime(songTime - 5))
    const fastForward = () => props.dispatch(updateTime(songTime + 5))

    const pauseBtn = <MediaControlBtn name='pause' btnTheme={btnTheme} handleMediaBtnClick={() => props.dispatch(pause())}/>
    const playBtn = <MediaControlBtn name='play' btnTheme={btnTheme} handleMediaBtnClick={() => props.dispatch(play())}/>
    const { mediaControls, mediaControlBtns } = styles

    return (
        <div className={mediaControls}>
            <div className={mediaControlBtns}>

                <MediaControlBtn name='shuffle' btnTheme={btnTheme} handleMediaBtnClick={
                    () => props.dispatch(toggleShuffle())
                } />

                <MediaControlBtn
                    name='rewind'
                    btnTheme={btnTheme}
                    handleMediaBtnClick={rewind}
                />

                {props.media.paused ? playBtn : pauseBtn}

                <MediaControlBtn
                    name='fastForward'
                    btnTheme={btnTheme}
                    handleMediaBtnClick={fastForward}
                />

                <MediaControlBtn name='loop' btnTheme={btnTheme} handleMediaBtnClick={
                    () => props.dispatch(toggleLoop())
                } />

                <VolumeBtn media={props.media} btnTheme={btnTheme} dispatch={props.dispatch} />
            </div>


            <BarComponent
                orientation='horizontal'
                name='song'
                dispatch={props.dispatch}
                media={props.media}
            />
        </div>
    )
}

export default MediaControls