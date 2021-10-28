import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { setOpenedPlaylist } from '../../reducers/librarySlice'

// Make it configurable in the app
export const directories = {
    songs: {
        name: 'Songs',
        addEntryText: 'Upload Song',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    },
    playlists: {
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
        name: 'openedPlaylist',
        addEntryText: 'Add Song to Playlist',
        handleAddEntryClick: function() {
            const uploadSongInput = document.getElementById('upload-song')
            uploadSongInput.click()
        },
        hasInputComponent: true
    }
}

const DirectoryList = props => {
    const directoryNamesToRender = Object.keys(directories)
    return (
        directoryNamesToRender.map(directoryName => {
            const modifierClass = directoryName === props.currentDirectory.name ?
                'active-directory' : ''
            const capitalizedDirectoryName = directoryName.charAt(0).toUpperCase() + directoryName.slice(1)

            const uniqueKey = uuidv4()
            return (
                <li key={uniqueKey} onClick={() => {
                    props.dispatch(setOpenedPlaylist(undefined))
                    props.setCurrentDirectory(() => directories[directoryName])
                }}
                    className={`btn directory-name ${modifierClass}`.trim()}>
                    {capitalizedDirectoryName}
                </li>
            )
        })
    )
}

export default DirectoryList