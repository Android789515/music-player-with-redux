import React from 'react'

import { directories } from './DirectoryList'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

import DirectoryEntry from './generic-components/DirectoryEntry'

const PlaylistDirectoryEntry = props => {
    const cutPlaylistName = () => {
        const maxCharLenAsEntry = 20
        const name = props.playlist.name
        const isNameTooLong = name.length > maxCharLenAsEntry

        const cutName = name.split('').reduce((result, char, index) => {
            const shouldKeepLetter = index <= 20
            return result + (shouldKeepLetter ? char : '')
        }, '')

        return isNameTooLong ? cutName + '...' : name
    }

    const openPlaylist = () => {
        // Show songs in the playlist
        props.dispatch(setOpenedPlaylist(props.playlist))

        props.setCurrentDirectory(() => directories.openedPlaylist)
    }

    const deleteEntry = event => {
        event.target.removeEventListener('deleterequest', deleteEntry)
    }

    return (
        <DirectoryEntry
            entry={props.playlist}
            className='btn directory-entry'
            onClick={openPlaylist}
            deleteEntry={deleteEntry}
            contextoptions={['open', 'rename', 'delete']}
        >
            <h4 className='playlist-entry-title'>{cutPlaylistName()}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry