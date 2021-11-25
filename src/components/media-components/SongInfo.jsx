import React from 'react'

import styles from '../../css/media-player/SongInfo.module.scss'
import { getFormattedSongTime } from '../../utils/TimeFormatter'

const SongInfo = ({ queuedSong: { src, title, artist }, ...props }) => {
    const isSongQueued = src !== undefined
    const currentSongTime =
        getFormattedSongTime(isSongQueued ? props.media.time : undefined)

    const { songInfo, songTitle, songArtist, songDuration } = styles
    return (
        <div className={songInfo}>
            <h2 className={songTitle}>{title}</h2>
            <p className={songArtist}>{artist}</p>

            <p className={songDuration}>{currentSongTime}</p>
        </div>
    )
}

export default SongInfo