import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/music-library-styles.scss'

import { addPlaylist, addSong, queueSong } from '../../reducers/librarySlice'

import Directory from './Directory'
import SongUploader from './SongUploader'
import SongDirectoryEntry from './SongDirectoryEntry'
import PlaylistDirectoryEntry from './PlaylistDirectoryEntry'
import AddEntryBtn from './AddEntryBtn'

const LibraryComponent = props => {
    const [ currentDirectory, setCurrentDirectory ] = useState('songs')
    const [ customPlaylistEntries, setCustomPlaylistEntries ] = useState(undefined)
    const songs = useSelector(state => state['library'].songs)
    const playlists = useSelector(state => state['library'].playlists)

    const directoryNames = ['playlists', 'songs']
        .map((directoryName, index) => {
            const modifierClass = directoryName === currentDirectory ?
                'active-directory' : ''
            return (
                <li key={index} onClick={() => {
                    setCustomPlaylistEntries(() => undefined)
                    setCurrentDirectory(() => directoryName)
                }}
                    className={`btn directory-name ${modifierClass}`.trim()}>
                    {directoryName.charAt(0).toUpperCase() + directoryName.slice(1)}
                </li>
            )
        })

    const getSongEntries = (songs, doOnClick) => songs.map(song => (
        <SongDirectoryEntry
            song={song}
            doOnClick={() => doOnClick(song)}
            dispatch={props.dispatch}
        />
    ))

    const getPlaylistEntries = playlists => {
        if (customPlaylistEntries) {
            return customPlaylistEntries
        } else {
            return playlists.map(playlistValues => {
                const playlistInfo = playlistValues[0]
                const playlistSongs = playlistValues[1]
                return (
                    <PlaylistDirectoryEntry
                        playlistInfo={playlistInfo}
                        songCount={playlistSongs.length}
                        doOnClick={() =>
                            setCustomPlaylistEntries(getSongEntries(playlistSongs,
                                    song => props.dispatch(queueSong(song))))}
                        dispatch={props.dispatch}
                    />
                )
            })
        }
    }

    const songsDirectory = (
        <Directory name='songs' entries={getSongEntries(songs, song => props.dispatch(queueSong(song)))}>
            <AddEntryBtn
                btnText='Add Song'
                doOnClick={() => {
                    const uploadSongInput = document.getElementById('upload-song')
                    uploadSongInput.click()
                }}
                uploadInput={<SongUploader dispatch={props.dispatch} />}
            />
        </Directory>
    )

    const playlistsDirectory = (
        <Directory
            name='playlists'
            entries={getPlaylistEntries(playlists)}
        >
            <AddEntryBtn btnText='Add Song to Playlist' doOnClick={() => {
                setCustomPlaylistEntries(getSongEntries(songs, song => props.dispatch(addSong({
                    to: 'playlist',
                    song: song
                }))))
            }} />
        </Directory>
    )

    const renderCurrentDirectory = () => {
        switch (currentDirectory) {
            case 'songs':
                return songsDirectory

            case 'playlists':
                return playlistsDirectory

            default:
                return <Directory name='empty' />
        }
    }
    return (
        <section className='library'>
            <ul className='non-default-ul directory-names'>
                {directoryNames}
            </ul>
            {renderCurrentDirectory()}

            {/* Playlist directory here */}
        </section>
    )
}

export default LibraryComponent