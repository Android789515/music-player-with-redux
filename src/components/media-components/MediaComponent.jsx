import React from 'react'
import { useSelector } from 'react-redux'

import '../../css/media-styles/media-player-styles.scss'

import AudioPlayer from './AudioPlayer'
import MediaControls from './MediaControls'

import fallBackImg from '../../img/cover-art-fallback.svg'
import SongInfoComponent from './SongInfoComponent'

function MediaComponent(props) {
    const media = useSelector(state => state['media'])
    const isSongQueued = props.queuedSong.src !== undefined

    return (
        <section className='media-component'>
            <AudioPlayer queuedSong={props.queuedSong} media={media} dispatch={props.dispatch}/>

            <section className='media-content'>
                <img className={`cover-art ${isSongQueued ? '' : 'hidden'}`.trim()} src={fallBackImg} alt="" />

                <SongInfoComponent queuedSong={props.queuedSong} media={media}/>
            </section>

            <MediaControls media={media} dispatch={props.dispatch}/>
        </section>
    )
}

function getScaledCoverArtSize(queuedSong) {
    const isSongQueued = queuedSong.src !== undefined
    if (isSongQueued) {
        const currentDocumentWidth = window.innerWidth
        const firstMediaBreakpoint = currentDocumentWidth >= 520
        const largeScreenSecondImageBreakpoint = currentDocumentWidth <= 720
        console.log(currentDocumentWidth)

        if (firstMediaBreakpoint && !largeScreenSecondImageBreakpoint) {
            return '45%'
        } else if (largeScreenSecondImageBreakpoint) {
            return '50%'
        }
    } else {
        // const originalImageWidth = document.querySelector('.cover-art').style.width
        // return originalImageWidth

        // Return original image width from the CSS
        return '82.55%'
    }
}

export default MediaComponent