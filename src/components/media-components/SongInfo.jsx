import React from 'react'

import formatTime from 'src/utils/formatTime'

import styles from '../../css/media-player/SongInfo.module.scss'

const SongInfo = ({ queuedSong: { src, title, artist }, ...props }) => {
    const isSongQueued = src !== undefined
    const currentSongTime =
        formatTime(isSongQueued ? props.media.time : undefined)

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