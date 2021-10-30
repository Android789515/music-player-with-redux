import React, { useEffect } from 'react'

import { toggleMute } from '../../reducers/mediaSlice'

import MediaControlBtn from './MediaControlBtn'
import BarComponent from './BarComponent'

const VolumeBtn = props => {
    const { muted, volume } = props.media

    const lowVolume = volume > 0 && volume <= .3
    const medVolume = volume > .3 && volume <= .6
    const highVolume = volume > .6

    let btnName
    if (muted || volume === 0) {
        btnName = 'muted'
    } else if (lowVolume) {
        btnName = 'low-vol'
    } else if (medVolume) {
        btnName = 'med-vol'
    } else if (highVolume) {
        btnName = 'high-vol'
    }

    const toggleVolumeBarHidden = event => {
        // Leave commented until it is determined
        // with certainty that having it commented
        // produces no bugs or errors
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
                        if (muted) {
                            props.dispatch(toggleMute())
                        }
                    }}
                />
            </div>
            <MediaControlBtn
                name={btnName}
                btnTheme={props.btnTheme}
                isVolumeBtn={true}
                handleMediaBtnClick={() => props.dispatch(toggleMute())}
            />
        </>
    )
}

export default VolumeBtn