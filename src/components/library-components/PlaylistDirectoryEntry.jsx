import React from 'react'

import { directories } from './DirectoryList'
import { contextMenuOptions } from './generic-components/ContextMenu'
import { customEvents } from '../../events'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

import DirectoryEntry from './generic-components/DirectoryEntry'

const PlaylistDirectoryEntry = props => {
    const cutPlaylistName = () => {
        const entryCharLimit = 20
        const name = props.playlist.name
        const isNameTooLong = name.length > entryCharLimit

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
        // event.target.removeEventListener(customEvents.deleteRequest, deleteEntry)
    }

    const { _open, _rename, _delete } = contextMenuOptions

    return (
        <DirectoryEntry
            className='btn directory-entry'
            entry={props.playlist}
            onClick={openPlaylist}
            deleteEntry={deleteEntry}
            contextoptions={[_open, _rename,  _delete]}
        >
            <h4 className='playlist-entry-title'>{cutPlaylistName()}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry