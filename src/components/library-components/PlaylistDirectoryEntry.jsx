import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { directoryEntry } from '../../css/modules/library/DirectoryEntry.module.scss'
import styles from '../../css/modules/library/PlaylistDirectoryEntry.module.scss'

import { directories } from './DirectoryList'
import { contextMenuOptions } from './generic-components/ContextMenu'
import { stop } from '../../reducers/mediaSlice'
import { removePlaylist, setOpenedPlaylist, unqueueSong } from '../../reducers/librarySlice'

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

    const queuedSongId = useSelector(state => state['library'].queuedSong.id)
    const deleteEntry = () => {
        const doesPlaylistContainQueuedSong = props.playlist.songs.find(song => song.id === queuedSongId)

        if (doesPlaylistContainQueuedSong) {
            props.dispatch(stop())
            props.dispatch(unqueueSong())
        }

        props.dispatch(removePlaylist(props.playlist.id))
    }

    const currentModalData = useSelector(state => state['modal'].modalData)
    useEffect(() => {
        if (currentModalData.id === props.playlist.id) {
            deleteEntry()
            props.dispatch(setModalData({}))
        }
    }, [currentModalData])

    const { _open, _rename, _delete } = contextMenuOptions

    const { playlistEntryTitle, playlistEntrySongCount } = styles
    return (
        <DirectoryEntry
            className={`btn ${directoryEntry}`}
            entry={props.playlist}
            onClick={openPlaylist}
            contextoptions={[_open, _rename,  _delete]}
        >
            <h4 className={playlistEntryTitle}>{cutPlaylistName()}</h4>
            <p className={playlistEntrySongCount}>{props.playlist.songs.length} songs</p>
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry