import React from 'react'
import { useSelector } from 'react-redux'

import '../../css/media-styles/media-player-styles.scss'

import AudioPlayer from './AudioPlayer'
import MediaControls from './MediaControls'

import fallBackImg from '../../img/cover-art-fallback.svg'
import SongInfoComponent from './SongInfoComponent'

function MediaComponent(props) {
    const media = useSelector(state => state['media'])

    return (
        <section className='media-component'>
            <AudioPlayer queuedSong={props.queuedSong} media={media} dispatch={props.dispatch} />

            <section className='media-content'>
                <img className='cover-art' src={fallBackImg} alt='' />

                <SongInfoComponent queuedSong={props.queuedSong} media={media} />
            </section>

            <MediaControls media={media} dispatch={props.dispatch} />
        </section>
    )
}

export default MediaComponent