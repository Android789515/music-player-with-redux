import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { directories } from './DirectoryList'
import { contextMenuOptions } from './generic-components/ContextMenu'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

import DirectoryEntry from './generic-components/DirectoryEntry'
import { setModalData } from '../../reducers/modalSlice'

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

    const deleteEntry = () => {

    }

    const currentModalData = useSelector(state => state['modal'].modalData)
    useEffect(() => {
        if (currentModalData.id === props.playlist.id) {
            deleteEntry()
            props.dispatch(setModalData(undefined))
        }
    }, [currentModalData])

    const { _open, _rename, _delete } = contextMenuOptions

    return (
        <DirectoryEntry
            className='btn directory-entry'
            entry={props.playlist}
            onClick={openPlaylist}
            contextoptions={[_open, _rename,  _delete]}
        >
            <h4 className='playlist-entry-title'>{cutPlaylistName()}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry