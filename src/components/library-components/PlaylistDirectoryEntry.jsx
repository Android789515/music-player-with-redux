import React from 'react'
import DirectoryEntry from './DirectoryEntry'

const PlaylistDirectoryEntry = props => {
    return (
        <DirectoryEntry
            entry={props.playlist}
            className='btn directory-entry'
            onClick={() => {
                // Show songs in the playlist
            }}
        >
            <h4 className='playlist-entry-title'>{props.playlist.name}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry