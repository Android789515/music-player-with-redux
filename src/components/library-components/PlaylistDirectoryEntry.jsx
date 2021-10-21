import React from 'react'
import DirectoryEntry from './DirectoryEntry'

const PlaylistDirectoryEntry = props => {
    return (
        <DirectoryEntry
            entry={props.playlistInfo}
            className='btn directory-entry'
            onClick={() => props.doOnClick()}
        >
            <h4 className='playlist-entry-title'>{props.playlistInfo.title}</h4>
            <p className='playlist-entry-song-count'>{props.songCount}</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry