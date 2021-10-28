import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import store from '../../store'
import { setOpenedPlaylist } from '../../reducers/librarySlice'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// Make it configurable in the app
export const directories = {
    songs: {
        name: 'songs',
        addEntryText: 'Upload Song',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    },
    playlists: {
        name: 'playlists',
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
        name: store.getState().library.openedPlaylist.name,
        addEntryText: 'Add Song to Playlist',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    }
}

const createDirectoryName = identifier => {
    const name = directories[identifier].name
    console.log(store.getState().library)
    if (identifier !== 'openedPlaylist') {
        return capitalize(name)
    } else {
        const isPlaylistOpen = store.getState().library.openedPlaylist.name !== undefined
        if (isPlaylistOpen) {
            return name
        }
    }
}

const DirectoryList = props => {
    const directoryNamesToRender = Object.keys(directories)
    return (
        directoryNamesToRender.map(directoryIdentifier => {
            const modifierClass = directoryIdentifier === props.currentDirectory.name ?
                'active-directory' : ''
            const directoryName = createDirectoryName(directoryIdentifier)

            const uniqueKey = uuidv4()
            return (
                <li key={uniqueKey} onClick={() => {
                    props.dispatch(setOpenedPlaylist(undefined))
                    props.setCurrentDirectory(() => directories[directoryIdentifier])
                }}
                    className={`btn directory-name ${modifierClass}`.trim()}>
                    {directoryName}
                </li>
            )
        })
    )
}

export default DirectoryList