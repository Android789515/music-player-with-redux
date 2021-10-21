import React from 'react'
import { useSelector } from 'react-redux'

import '../../css/media-styles/media-player-styles.scss'

import { getFormattedSongTime } from '../../TimeFormatter'
import AudioPlayer from './AudioPlayer'
import MediaControls from './MediaControls'

import fallBackImg from '../../img/cover-art-fallback.svg'
import SongInfoComponent from './SongInfoComponent'

function MediaComponent(props) {
    const media = useSelector(state => state['media'])

    const isSongQueued = props.queuedSong.src !== undefined
    const currentSongTime = getFormattedSongTime(isSongQueued ? media.time : undefined)

    return (
        <section className='media-component'>
            <AudioPlayer queuedSong={props.queuedSong} media={media} dispatch={props.dispatch} />

            <section className='media-content'>
                <img className='cover-art' src={fallBackImg} alt='' />

                <div className='song-info'>
                    <h2 className='song-title'>{props.queuedSong.title}</h2>
                    <p className='song-artist'>{props.queuedSong.artist}</p>

                    <p className='song-duration'>{currentSongTime}</p>
                </div>

                <SongInfoComponent />
            </section>

            <MediaControls media={media} dispatch={props.dispatch} />
        </section>
    )
}

export default MediaComponent