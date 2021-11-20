import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { library as libraryStyle, libraryOpen } from '../../css/modules/library/Library.module.scss'
import { overlayComponent } from '../../css/modules/GenericStyles.module.scss'
import '../../css/library-styles/music-library-styles.scss'

import { directories } from './DirectoryList'

import DirectoryList from './DirectoryList'
import CurrentDirectory from './CurrentDirectory'

const Library = ({ isLibraryShown }) => {
    const dispatch = useDispatch()

    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    const library = useSelector(state => state['library'])
    const { openedPlaylist } = library

    return (
        <section className={`${libraryStyle} ${overlayComponent} ${isLibraryShown ? libraryOpen : ''}`}>
            <DirectoryList
                currentDirectory={currentDirectory}
                setCurrentDirectory={setCurrentDirectory}
                dispatch={dispatch}
            />

            <CurrentDirectory
                identifier={currentDirectory.identifier}
                addEntryText={openedPlaylist ?
                    'Add Song to Playlist' :
                    currentDirectory.addEntryText}
                hasInputComponent={currentDirectory.hasInputComponent}
                setCurrentDirectory={setCurrentDirectory}
                dispatch={dispatch}
            />
        </section>
    )
}

export default Library