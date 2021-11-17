import React from 'react'

import { softRoundedCorners, hidden } from '../../css/modules/GenericStyles.module.scss'
import { mediaInfo, coverArt } from '../../css/modules/media-player/MediaInfo.scss'

import SongInfoComponent from './SongInfoComponent'
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

            <SongInfoComponent queuedSong={queuedSong} media={media} />
        </section>
    )
}

export default MediaInfo