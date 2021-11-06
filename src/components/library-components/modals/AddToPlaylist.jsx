import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { contextMenuOptions } from '../generic-components/ContextMenu'
import { getFormattedSongTime } from '../../../TimeFormatter'
import useButtonToggle from '../../../hooks/useButtonToggle'

import DirectoryEntry from '../generic-components/DirectoryEntry'

const AddToPlaylist = props => {
    const [ songsToAdd, updateSongsToAdd ] = useState([])

    const songs = useSelector(state => state['library'].songs)

    const { isToggled, toggle } = useButtonToggle()

    const songEntries = songs.map(song => {
        return (
            <div className='add-song-container'>
                <button className='btn'>{isToggled ? '-' : '+'}</button>

                <DirectoryEntry
                    entry={song}
                    className={`btn directory-entry ${isToggled ? 'selected' : ''}`.trim()}
                    id={song.id}
                    onClick={handleClick}
                    contextoptions={[contextMenuOptions._delete]}
                >
                    <h4 className='song-entry-title song-entry-info'>{props.song.title}</h4>
                    <p className='song-entry-artist song-entry-info'>{props.song.artist}</p>
                    <p className='song-entry-duration'>{getFormattedSongTime(props.song.duration)}</p>
                </DirectoryEntry>
            </div>
        )
    })

    const handleClick = ({ target: songEntry }) => {
        toggle()
        if (isToggled) {
            unmarkSongToBeAdded(songEntry)
        } else {
            markSongToBeAdded(songEntry)
        }
    }

    const markSongToBeAdded = songEntry => {
        updateSongsToAdd(prevSongs => [...prevSongs, songEntry])
    }

    const unmarkSongToBeAdded = songEntry => {
        updateSongsToAdd(prevSongs => prevSongs.filter(song => song.id !== songEntry.id))
    }

    return (
        <div className='add-to-playlist-modal modal-content overlay-component hard-rounded-corners'>
            <ul className='unstyled-ul'>
                {songEntries}
            </ul>


        </div>
    )
}

export default AddToPlaylist