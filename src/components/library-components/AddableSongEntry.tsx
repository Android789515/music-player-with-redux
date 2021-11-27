import React from 'react'
import { v4 as uuidv4 } from 'uuid'

// @ts-ignore
import { hardRoundedCorners } from '../../css/GenericStyles.module.scss'
// @ts-ignore
import { btn } from '../../css/buttons/Btn.module.scss'
// @ts-ignore
import { addBtn, removeBtn, forAddableSong } from '../../css/buttons/AddBtn.module.scss'
// @ts-ignore
import { songEntryTitle, songEntryArtist } from '../../css/library/SongDirectoryEntry.module.scss'
import {
    // @ts-ignore
    addableSong,
    // @ts-ignore
    selected,
    // @ts-ignore
    directoryEntry,
    // @ts-ignore
    songEntryInfo,
    // @ts-ignore
    songEntryDuration
} from '../../css/library/AddableSongEntry.module.scss'

import { getFormattedSongTime } from '../../utils/timeFormatter'
import { Song } from '../../utils/entryTypes'
import useButtonToggle from '../../hooks/useButtonToggle'

import DirectoryEntry from './generic-components/DirectoryEntry'

interface Props {
    updateSongsToAdd: (fn: (prevState: Song[]) => Song[]) => void
    song: Song
    isMarked: boolean
}

const AddableSongEntry = ({ updateSongsToAdd, song, isMarked = false }: Props) => {
    const { isToggled, toggle } = useButtonToggle(isMarked)

    const handleClick = () => {
        toggle()
        if (isToggled) {
            unmarkSongToBeAdded(song)
        } else {
            markSongToBeAdded(song)
        }
    }

    const markSongToBeAdded = (song: Song) => {
        updateSongsToAdd(prevSongs => [...prevSongs, song])
    }

    const unmarkSongToBeAdded = (unmarkSong: Song) => {
        updateSongsToAdd(prevSongs => prevSongs.filter(song => song.id !== unmarkSong.id))
    }

    const id = uuidv4()
    return (
        <div
            className={`${addableSong} ${hardRoundedCorners} ${isToggled ? selected : ''}`.trim()}
            key={id}
            onClick={handleClick}
        >
            <button className={
            `
                btn ${isToggled ? removeBtn : addBtn} ${forAddableSong}
            `
            }>{isToggled ? '-' : '+'}</button>

            <DirectoryEntry
                entry={song}
                className={`${btn} ${directoryEntry}`}
                contextoptions={[]}
            >
                <h4 className={`${songEntryTitle} ${songEntryInfo}`}>{song.title}</h4>
                <p className={`${songEntryArtist} ${songEntryInfo}`}>{song.artist}</p>
                <p className={`${songEntryDuration}`}>{getFormattedSongTime(song.duration)}</p>
            </DirectoryEntry>
        </div>
    )
}

export default AddableSongEntry