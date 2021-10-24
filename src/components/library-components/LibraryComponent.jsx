import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { directories } from './Directories'

import Directories from './Directories'
import CurrentDirectory from './CurrentDirectory'
import SongDirectoryEntry from './SongDirectoryEntry'

const LibraryComponent = props => {
    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    // This is used for playlist directory
    // const [ customPlaylistEntries, setCustomPlaylistEntries ] = useState(undefined)
    const songs = useSelector(state => state['library'].songs)
    const playlists = useSelector(state => state['library'].playlists)
    const musicLibrary = new Map([
        ['songs', songs],
        ['playlists', playlists]
    ])

    const getSongEntries = (songs, doOnClick) => songs.map((song, index) => {
        return (
            <SongDirectoryEntry
                key={index}
                song={song}
                doOnClick={() => doOnClick(song)}
                dispatch={props.dispatch}
            />
        )
    })

    const currentEntries = musicLibrary.get(currentDirectory.name)
    return (
        <section className='library overlay-component'>
            <ul className='unstyled-ul directory-names'>
                <Directories currentDirectory={currentDirectory} setCurrentDirectory={setCurrentDirectory} />
            </ul>


            <CurrentDirectory
                name={currentDirectory.name}
                getEntries={getSongEntries(currentEntries, currentEntries.doOnClick)}
                addEntryText={currentDirectory.addEntryText}
                handleAddEntryClick={currentDirectory.handleAddEntryClick}
                hasInputComponent={currentDirectory.hasInputComponent}
            />
        </section>
    )
}

export default LibraryComponent