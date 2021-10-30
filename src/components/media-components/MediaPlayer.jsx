import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../css/media-styles/media-player-styles.scss'

import AudioPlayer from './AudioPlayer'
import MediaControls from './MediaControls'
import SongInfoComponent from './SongInfoComponent'

import fallBackImg from '../../img/cover-art-fallback.svg'

function MediaPlayer() {
    const dispatch = useDispatch()

    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const isSongQueued = queuedSong.src !== undefined

    return (
        <section className='media-player'>
            <AudioPlayer queuedSong={queuedSong} media={media} dispatch={dispatch}/>

            <section className='media-content'>
                <img
                    className={`cover-art soft-rounded-corners ${isSongQueued ? '' : 'hidden'}`.trim()}
                    src={queuedSong.coverArt || fallBackImg}
                    alt='Song cover art'
                />

                <SongInfoComponent queuedSong={queuedSong} media={media}/>
            </section>

            {isSongQueued && <MediaControls media={media} dispatch={dispatch}/>}
        </section>
    )
}

export default MediaPlayer