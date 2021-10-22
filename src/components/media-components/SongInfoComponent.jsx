import React from 'react'

import { getFormattedSongTime } from '../../TimeFormatter'

const SongInfoComponent = props => {
    const isSongQueued = props.queuedSong.src !== undefined
    const currentSongTime = getFormattedSongTime(isSongQueued ? props.media.time : undefined)

    return (
        <div className="song-info">
            <h2 className="song-title">{props.queuedSong.title}</h2>
            <p className="song-artist">{props.queuedSong.artist}</p>

            <p className="song-duration">{currentSongTime}</p>
        </div>

        // <div className='song-info'>
        //     <h2 className={`song-title ${!isSongQueued ? 'hidden' : ''}`.trim()}>
        //         {props.queuedSong.title || 'Placeholder'}
        //     </h2>
        //     <p className={`song-artist ${!isSongQueued ? 'hidden' : ''}`.trim()}>
        //         {props.queuedSong.artist || 'Placeholder'}
        //     </p>
        //
        //     <p className={`song-duration ${!isSongQueued ? 'hidden' : ''}`.trim()}>
        //         {currentSongTime || '00:00'}
        //     </p>
        // </div>
    )
}

export default SongInfoComponent