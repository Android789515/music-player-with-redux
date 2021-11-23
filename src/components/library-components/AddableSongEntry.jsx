import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { hardRoundedCorners } from '../../css/GenericStyles.module.scss'
import { addBtn } from '../../css/buttons/AddBtn.module.scss'
import { songEntryTitle, songEntryArtist } from '../../css/library/SongDirectoryEntry.module.scss'
import styles from '../../css/library/AddableSongEntry.module.scss'

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

    const id = uuidv4()
    const {
        addableSong,
        selected,
        directoryEntry,
        songEntryInfo,
        songEntryDuration
    } = styles
    return (
        <div className={`${addableSong} ${hardRoundedCorners} ${isToggled ? selected : ''}`.trim()} key={id}>
            <button className={`btn ${addBtn}`}>{isToggled ? '-' : '+'}</button>

            <DirectoryEntry
                entry={song}
                className={`btn ${directoryEntry}`}
                id={song.id}
                onClick={handleClick}
            >
                <h4 className={`${songEntryTitle} ${songEntryInfo}`}>{song.title}</h4>
                <p className={`${songEntryArtist} ${songEntryInfo}`}>{song.artist}</p>
                <p className={`${songEntryDuration}`}>{getFormattedSongTime(song.duration)}</p>
            </DirectoryEntry>
        </div>
    )
}

export default AddableSongEntry