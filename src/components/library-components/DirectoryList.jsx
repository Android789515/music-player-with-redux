import React from 'react'

import { setOpenedPlaylist } from '../../reducers/librarySlice'

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
    // Don't render the directory name: openedPlaylist
    const directoryNamesToRender = Object.keys(directories).filter(directory => directory !== 'openedPlaylist')
    return (
        directoryNamesToRender.map((directoryName, index) => {
            const modifierClass = directoryName === props.currentDirectory.name ?
                'active-directory' : ''
            const capitalizedDirectoryName = directoryName.charAt(0).toUpperCase() + directoryName.slice(1)

            return (
                <li key={index} onClick={() => {
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