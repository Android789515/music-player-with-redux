import React from 'react'

import { play, stop } from '../../reducers/mediaSlice'
import { getFormattedSongTime } from '../../TimeFormatter'
import DirectoryEntry from './DirectoryEntry'

const SongDirectoryEntry = props => (
    <DirectoryEntry
        entry={props.song}
        className='btn directory-entry'
        onClick={() => {
            props.dispatch(stop())
            props.doOnClick()
            props.dispatch(play())
        }}
    >
        <h4 className='song-entry-title song-entry-info'>{props.song.title}</h4>
        <p className='song-entry-artist song-entry-info'>{props.song.artist}</p>
        <p className='song-entry-duration'>{getFormattedSongTime(props.song.duration)}</p>
    </DirectoryEntry>
)

export default SongDirectoryEntry