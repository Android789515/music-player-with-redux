import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { directories } from './Directories'

import Directories from './Directories'
import CurrentDirectory from './CurrentDirectory'
import SongDirectoryEntry from './SongDirectoryEntry'
import PlaylistDirectoryEntry from './PlaylistDirectoryEntry'

const LibraryComponent = props => {
    // Keeps track of what directory is open
    const [ currentDirectory, setCurrentDirectory ] = useState(directories.songs)
    // This is used for playlist directory
    const [ customPlaylistEntries, setCustomPlaylistEntries ] = useState(undefined)
    const { songs, playlists, openedPlaylist } = useSelector(state => state['library'])
    // const songs = useSelector(state => state['library'].songs)
    // const playlists = useSelector(state => state['library'].playlists)
    const musicLibrary = new Map([
        ['songs', songs],
        ['playlists', playlists]
    ])

    const getEntries = entries => entries.map(entry => {
        if (currentDirectory.name === 'playlists') {
            if (customPlaylistEntries) {
                return customPlaylistEntries
            } else {
                return (
                    <PlaylistDirectoryEntry
                        key={entry.id}
                        playlist={entry}
                        setCustomPlaylistEntries={setCustomPlaylistEntries}
                        dispatch={props.dispatch}
                    />
                )
            }
        } else {
            return (
                <SongDirectoryEntry
                    key={entry.id}
                    song={entry}
                    dispatch={props.dispatch}
                />
            )
        }
    })

    return (
        <section className='library overlay-component'>
            <ul className='unstyled-ul directory-names'>
                <Directories
                    currentDirectory={currentDirectory}
                    setCurrentDirectory={setCurrentDirectory}
                    setCustomPlaylistEntries={setCustomPlaylistEntries}
                />
            </ul>


            <CurrentDirectory
                name={currentDirectory.name}
                getEntries={getEntries(musicLibrary.get(currentDirectory.name))}
                addEntryText={customPlaylistEntries ? 'Add Song to Playlist' : currentDirectory.addEntryText}
                handleAddEntryClick={currentDirectory.handleAddEntryClick}
                hasInputComponent={currentDirectory.hasInputComponent}
             />
        </section>
    )
}

export default LibraryComponent