import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { setOpenedPlaylist } from '../../reducers/librarySlice'


// Make it configurable in the app
export const directories = {
    songs: {
        identifier: 'songs',
        name: 'Songs',
        addEntryText: 'Upload Song',
        hasInputComponent: true
    },
    playlists: {
        identifier: 'playlists',
        name: 'Playlists',
        addEntryText: 'Create Playlist',
        hasInputComponent: false
    },
    openedPlaylist: {
        identifier: 'openedPlaylist',
        addEntryText: 'Add Song to Playlist',
        hasInputComponent: false
    }
}

const renderDirectoryName = (identifier, openedPlaylist) => {

    if (identifier !== directories.openedPlaylist.identifier) {
        return directories[identifier].name
    } else {
        const isPlaylistOpen = openedPlaylist !== undefined
        if (isPlaylistOpen) {
            return openedPlaylist.name
        }
    }
}

const getClassModifiers = (identifier, currentDirectory) => {
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

const DirectoryList = ({ currentDirectory, ...props }) => {
    const directoryNamesToRender = Object.values(directories)
    const openedPlaylist = useSelector(state => state['library'].openedPlaylist)

    const setDirectory = directory => {
        const isDirectoryOpenDirectory = directory.identifier === directories.openedPlaylist.identifier
        if (!isDirectoryOpenDirectory) {
            props.dispatch(setOpenedPlaylist(undefined))
        }
        props.setCurrentDirectory(() => directory)
    }

    const directoryNames = directoryNamesToRender.map(directory => {
        const modifierClasses = getClassModifiers(directory.identifier, currentDirectory)

        const uniqueKey = uuidv4()
        return (
            <li key={uniqueKey} onClick={() => setDirectory(directory)}
                className={`btn directory-name ${modifierClasses}`.trim()}>
                {renderDirectoryName(directory.identifier, openedPlaylist)}
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