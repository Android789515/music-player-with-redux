import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { setOpenedPlaylist } from '../../reducers/librarySlice'

const getCapitalizedString = string => string.charAt(0).toUpperCase() + string.slice(1)

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
        directoryNamesToRender.map(directoryIdentifier => {
            const modifierClass = directoryIdentifier === props.currentDirectory.name ?
                'active-directory' : ''
            const directoryName = directories[directoryIdentifier].name
            const capitalizedDirectoryName = getCapitalizedString(directoryName)

            const uniqueKey = uuidv4()
            return (
                <li key={uniqueKey} onClick={() => {
                    props.dispatch(setOpenedPlaylist(undefined))
                    props.setCurrentDirectory(() => directories[directoryIdentifier])
                }}
                    className={`btn directory-name ${modifierClass}`.trim()}>
                    {capitalizedDirectoryName}
                </li>
            )
        })
    )
}

export default DirectoryList