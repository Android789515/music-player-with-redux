import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { directories } from './Directories'

import Directories from './Directories'
import CurrentDirectory from './CurrentDirectory'
import DirectoryEntries from './DirectoryEntries'

const LibraryComponent = props => {
    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    const library = useSelector(state => state['library'])
    const { openedPlaylist } = library

    return (
        <section className='library overlay-component'>
            <ul className='unstyled-ul directory-names'>
                <Directories
                    currentDirectory={currentDirectory}
                    setCurrentDirectory={setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            </ul>


            <CurrentDirectory
                name={currentDirectory.name}
                addEntryText={openedPlaylist ? 'Add Song to Playlist' : currentDirectory.addEntryText}
                handleAddEntryClick={currentDirectory.handleAddEntryClick}
                hasInputComponent={openedPlaylist ? true : currentDirectory.hasInputComponent}
            >
                <DirectoryEntries
                    entries={library[currentDirectory.name]}
                    directoryName={currentDirectory.name}
                    setCurrentDirectory={setCurrentDirectory}
                    dispatch={props.dispatch}
                >

                </DirectoryEntries>
            </CurrentDirectory>
        </section>
    )
}

export default LibraryComponent