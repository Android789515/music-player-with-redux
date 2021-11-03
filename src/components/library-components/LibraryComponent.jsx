import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { directories } from './DirectoryList'

import DirectoryList from './DirectoryList'
import CurrentDirectory from './CurrentDirectory'

const LibraryComponent = () => {
    const dispatch = useDispatch()

    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    const library = useSelector(state => state['library'])
    const { openedPlaylist } = library

    return (
        <section className='library overlay-component'>
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

export default LibraryComponent