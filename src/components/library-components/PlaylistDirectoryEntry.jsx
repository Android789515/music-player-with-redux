import React from 'react'

import { directories } from './DirectoryList'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

import DirectoryEntry from './DirectoryEntry'
import SongDirectoryEntry from './SongDirectoryEntry'

const PlaylistDirectoryEntry = props => {
    return (
        <DirectoryEntry
            entry={props.playlist}
            className='btn directory-entry'
            onClick={() => {
                // Show songs in the playlist
                props.dispatch(setOpenedPlaylist(props.playlist))

                props.setCurrentDirectory(() => directories.openedPlaylist)
            }}
        >
            <h4 className='playlist-entry-title'>{props.playlist.name}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry