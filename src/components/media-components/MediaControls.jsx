import React, {useEffect, useState} from 'react'

import '../../css/media-styles/media-controls-styles.scss'

import {pause, play, toggleLoop, toggleMute, toggleShuffle, updateTime} from '../../reducers/mediaSlice'

import MediaControlBtn from './MediaControlBtn'
import BarComponent from './BarComponent'
import VolumeBtn from './VolumeBtn'

function MediaControls(props) {
    const [ btnTheme, setBtnTheme ] = useState('dark')
    const pauseBtn = <MediaControlBtn name='pause' isDark={btnTheme === 'dark'} handleMediaBtnClick={() => props.dispatch(pause())}/>
    const playBtn = <MediaControlBtn name='play' isDark={btnTheme === 'dark'} handleMediaBtnClick={() => props.dispatch(play())}/>

    const toggleVolumeBarHidden = event => {
        if (event.target.classList === undefined) {
            return
        }
        const isMouseOverVolumeControls = event.target.classList.contains('vol-control-btn') ||
            event.target.classList.contains('volume-bar-area') || event.target.classList.contains('volume-bar') ||
            event.target.classList.contains('volume-slider')

        if (isMouseOverVolumeControls) {
            document.querySelector('.volume-bar').classList.remove('invisible')
        } else {
            document.querySelector('.volume-bar').classList.add('invisible')
        }
    }

    useEffect(() => {
        document.body.addEventListener('mousemove', toggleVolumeBarHidden)

        return () => {
            window.removeEventListener('mousemove', toggleVolumeBarHidden)
        }
    }, [])

    const songTime = props.media.time
    const rewind = () => props.dispatch(updateTime(songTime - 5))
    const fastForward = () => props.dispatch(updateTime(songTime + 5))

    return (
        <div className='media-controls'>
            <div className='media-control-btns'>

                <MediaControlBtn name='shuffle' isDark={btnTheme === 'dark'} handleMediaBtnClick={
                    () => props.dispatch(toggleShuffle())
                } />

                <MediaControlBtn
                    name='rewind'
                    isDark={btnTheme === 'dark'}
                    handleMediaBtnClick={rewind}
                />

                {/* Turn into component */}
                {props.media.paused ? playBtn : pauseBtn}

                <MediaControlBtn
                    name='fast-forward'
                    isDark={btnTheme === 'dark'}
                    handleMediaBtnClick={fastForward}
                />

                <MediaControlBtn name='loop' isDark={btnTheme === 'dark'} handleMediaBtnClick={
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