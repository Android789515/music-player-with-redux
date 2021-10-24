import React, { useEffect } from 'react'

import '../../css/media-styles/media-controls-styles.scss'

import { pause, play, toggleMute, updateTime } from '../../reducers/mediaSlice'

import MediaControlBtn from './MediaControlBtn'
import BarComponent from './BarComponent'

function MediaControls(props) {
    const pauseBtn = <MediaControlBtn name='pause' handleMediaBtnClick={() => props.dispatch(pause())}/>
    const playBtn = <MediaControlBtn name='play' handleMediaBtnClick={() => props.dispatch(play())}/>

    // Volume button
    const renderVolumeBtn = media => {
        const lowVolume = media.volume > 0 && media.volume <= .3
        const medVolume = media.volume > .3 && media.volume <= .6
        const highVolume = media.volume > .6

        let btnName
        if (media.muted || media.volume === 0) {
            btnName = 'muted'
        } else if (lowVolume) {
            btnName = 'low-vol'
        } else if (medVolume) {
            btnName = 'med-vol'
        } else if (highVolume) {
            btnName = 'high-vol'
        }

        return (
            <>
                <div className='volume-bar-area'>
                    <BarComponent
                        orientation='vertical'
                        name='volume'
                        modifiers={['fading-component', 'invisible']}
                        dispatch={props.dispatch}
                        media={props.media}
                        alsoDoOnClick={() => {
                            if (props.media.muted) {
                                props.dispatch(toggleMute())
                            }
                        }}
                    />
                </div>
                <MediaControlBtn
                    name={btnName}
                    unique={true}
                    handleMediaBtnClick={() => props.dispatch(toggleMute())}
                />
            </>
        )
    }
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

    return (
        <div className='media-controls'>
            <div className='media-control-btns'>
                <MediaControlBtn name='rewind' handleMediaBtnClick={() =>
                    props.dispatch(updateTime(songTime - 5))
                }/>

                {props.media.paused ? playBtn : pauseBtn}

                <MediaControlBtn name='fast-forward' handleMediaBtnClick={() =>
                    props.dispatch(updateTime(songTime + 5))
                }/>

                {renderVolumeBtn(props.media)}
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