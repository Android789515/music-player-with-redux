import React from 'react'
import BarComponent from './BarComponent'
import {toggleMute} from '../../reducers/mediaSlice'
import MediaControlBtn from './MediaControlBtn'

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
                isDark={props.btnTheme === 'dark'}
                unique={true}
                handleMediaBtnClick={() => props.dispatch(toggleMute())}
            />
        </>
    )
}

export default VolumeBtn