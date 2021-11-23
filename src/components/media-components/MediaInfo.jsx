import React from 'react'

import { softRoundedCorners, hidden } from '../../css/GenericStyles.module.scss'
import { mediaInfo, coverArt } from '../../css/media-player/MediaInfo.module.scss'

import SongInfo from './SongInfo'
import fallBackImg from '../../img/cover-art-fallback.svg'

const MediaInfo = ({ queuedSong, media }) => {
    const isSongQueued = queuedSong.src !== undefined

    return (
        <section className={mediaInfo}>
            <img
                className={`${coverArt} ${softRoundedCorners} ${isSongQueued ? '' : hidden}`.trim()}
                src={queuedSong.coverArt || fallBackImg}
                alt='Song cover art'
            />

            <SongInfo queuedSong={queuedSong} media={media} />
        </section>
    )
}

export default MediaInfo