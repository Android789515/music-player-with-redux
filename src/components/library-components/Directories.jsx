import React from 'react'

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
        },
        hasInputComponent: false
    },
    // playlistOpen: {
    //     name: 'open-playlist',
    //     addEntryText: 'Add Song to Playlist',
    //     handleAddEntryClick: function() {
    //
    //     },
    //     hasInputComponent: true
    // }
}

const Directories = props => {
    const directoryNames = Object.keys(directories)
    return (
        directoryNames.map((directoryName, index) => {
            const modifierClass = directoryName === props.currentDirectory.name ?
                'active-directory' : ''
            const capitalizedDirectoryName = directoryName.charAt(0).toUpperCase() + directoryName.slice(1)

            return (
                <li key={index} onClick={() => {
                    props.setCustomPlaylistEntries(() => undefined)
                    props.setCurrentDirectory(() => directories[directoryName])
                }}
                    className={`btn directory-name ${modifierClass}`.trim()}>
                    {capitalizedDirectoryName}
                </li>
            )
        })
    )
}

export default Directories