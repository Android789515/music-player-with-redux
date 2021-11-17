import React from 'react'

import SongInfoComponent from './SongInfoComponent'
import fallBackImg from '../../img/cover-art-fallback.svg'

const MediaInfo = ({ queuedSong, media }) => {
    const isSongQueued = queuedSong.src !== undefined

    return (
        <section className='media-info'>
            <img
                className={`cover-art softRoundedCorners ${isSongQueued ? '' : 'hidden'}`.trim()}
                src={queuedSong.coverArt || fallBackImg}
                alt='Song cover art'
            />

            <SongInfoComponent queuedSong={queuedSong} media={media} />
        </section>
    )
}

export default MediaInfo