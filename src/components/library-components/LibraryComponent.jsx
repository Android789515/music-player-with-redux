import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { directories } from './DirectoryList'

import DirectoryList from './DirectoryList'
import CurrentDirectory from './CurrentDirectory'
import DirectoryEntries from './generic-components/DirectoryEntries'

const LibraryComponent = props => {
    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    const library = useSelector(state => state['library'])
    const { openedPlaylist } = library

    return (
        <section className='library overlay-component'>
            <DirectoryList
                currentDirectory={currentDirectory}
                setCurrentDirectory={setCurrentDirectory}
                dispatch={props.dispatch}
            />

            <CurrentDirectory
                identifier={currentDirectory.identifier}
                addEntryText={openedPlaylist ? 'Add Song to Playlist' : currentDirectory.addEntryText}
                handleAddEntryClick={currentDirectory.handleAddEntryClick}
                hasInputComponent={openedPlaylist ? true : currentDirectory.hasInputComponent}
            >
                <DirectoryEntries
                    entries={library[currentDirectory.identifier]}
                    directoryIdentifier={currentDirectory.identifier}
                    setCurrentDirectory={setCurrentDirectory}
                    dispatch={props.dispatch}
                >

                </DirectoryEntries>
            </CurrentDirectory>
        </section>
    )
}

export default LibraryComponent