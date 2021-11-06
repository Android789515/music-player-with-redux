import React from 'react'

import { getFormattedSongTime } from '../../TimeFormatter'
import useButtonToggle from '../../hooks/useButtonToggle'

import DirectoryEntry from './generic-components/DirectoryEntry'

const AddableSongEntry = ({ updateSongsToAdd, song }) => {
    const { isToggled, toggle } = useButtonToggle()

    const handleClick = () => {
        toggle()
        if (isToggled) {
            unmarkSongToBeAdded(song)
        } else {
            markSongToBeAdded(song)
        }
    }

    const markSongToBeAdded = song => {
        updateSongsToAdd(prevSongs => [...prevSongs, song])
    }

    const unmarkSongToBeAdded = unmarkSong => {
        updateSongsToAdd(prevSongs => prevSongs.filter(song => song.id !== unmarkSong.id))
    }

    return (
        <div className={`addable-song ${isToggled ? 'selected' : ''}`.trim()}>
            <button className='btn entry-btn'>{isToggled ? '-' : '+'}</button>

            <DirectoryEntry
                entry={song}
                className='btn directory-entry'
                id={song.id}
                onClick={handleClick}
            >
                <h4 className='song-entry-title song-entry-info'>{song.title}</h4>
                <p className='song-entry-artist song-entry-info'>{song.artist}</p>
                <p className='song-entry-duration'>{getFormattedSongTime(song.duration)}</p>
            </DirectoryEntry>
        </div>
    )
}

export default AddableSongEntry