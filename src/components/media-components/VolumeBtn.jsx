import React, { useState } from 'react'

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

    const [ isVolumeBarHidden, setIsVolumeBarHidden ] = useState(true)

    return (
        <>
            <div
                className='volume-bar-area'
            >
                <BarComponent
                    orientation='vertical'
                    name='volume'
                    modifiers={['fading-component', `${isVolumeBarHidden ? 'invisible' : '' }`.trim()]}
                    dispatch={props.dispatch}
                    media={props.media}
                    onMouseEnter={() => setIsVolumeBarHidden(false)}
                    onMouseLeave={() => setIsVolumeBarHidden(true)}
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
                onMouseEnter={() => setIsVolumeBarHidden(false)}
                onMouseLeave={() => setIsVolumeBarHidden(true)}
            />
        </>
    )
}

export default VolumeBtn