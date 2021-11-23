import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mediaPlayer } from '../../css/media-player/MediaPlayer.module.scss'

import AudioPlayer from './AudioPlayer'
import MediaControls from './MediaControls'
import MediaInfo from './MediaInfo'

function MediaPlayer() {
    const dispatch = useDispatch()

    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const isSongQueued = queuedSong.src !== undefined

    return (
        <section className={mediaPlayer}>
            <AudioPlayer queuedSong={queuedSong} media={media} dispatch={dispatch} />

            <MediaInfo queuedSong={queuedSong} media={media} />

            {isSongQueued && <MediaControls media={media} dispatch={dispatch} />}
        </section>
    )
}

export default MediaPlayer