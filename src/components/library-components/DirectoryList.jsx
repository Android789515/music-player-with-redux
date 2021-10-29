import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import store from '../../store'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// Make it configurable in the app
export const directories = {
    songs: {
        identifier: 'songs',
        name: 'Songs',
        addEntryText: 'Upload Song',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    },
    playlists: {
        identifier: 'playlists',
        name: 'Playlists',
        addEntryText: 'Create Playlist',
        handleAddEntryClick: function() {
            const createPlaylistModal = document.querySelector('.create-playlist-modal')
            createPlaylistModal.classList.remove('hidden')
            const modalInput = document.querySelector('#create-playlist-input')
            modalInput.focus()
        },
        hasInputComponent: false
    },
    openedPlaylist: {
        identifier: 'openedPlaylist',
        addEntryText: 'Add Song to Playlist',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    }
}

const renderDirectoryName = identifier => {

    if (identifier !== directories.openedPlaylist.identifier) {
        return directories[identifier].name
    } else {
        const openedPlaylist = store.getState().library.openedPlaylist
        const isPlaylistOpen = openedPlaylist !== undefined
        if (isPlaylistOpen) {
            return openedPlaylist.name
        }
    }
}

const DirectoryList = props => {
    const { currentDirectory } = props
    const directoryNamesToRender = Object.values(directories)

    const directoryNames = directoryNamesToRender.map(directory => {
        const getClassModifiers = identifier => {
            const isDirectoryCurrent = identifier === currentDirectory.identifier
            const isDirectoryOpenedPlaylist = identifier === directories.openedPlaylist.identifier

            let modifiers = ''
            if (isDirectoryCurrent) {
                modifiers = `${modifiers} active-directory`
            }

            if (isDirectoryOpenedPlaylist) {
                modifiers = `${modifiers} opened-playlist`
            }

            return modifiers.trim()
        }

        const modifierClasses = getClassModifiers(directory.identifier)

        const uniqueKey = uuidv4()
        return (
            <li key={uniqueKey} onClick={() => {
                const isDirectoryOpenDirectory = directory.identifier === directories.openedPlaylist.identifier
                if (!isDirectoryOpenDirectory) {
                    props.dispatch(setOpenedPlaylist(undefined))
                }
                props.setCurrentDirectory(() => directory)
            }}
                className={`btn directory-name ${modifierClasses}`.trim()}>
                {renderDirectoryName(directory.identifier)}
            </li>
        )
    })

    return (
        <ul className='unstyled-ul directory-names'>
            {directoryNames}
        </ul>
    )
}

export default DirectoryList