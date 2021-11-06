import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { directories } from './DirectoryList'
import { contextMenuOptions } from './generic-components/ContextMenu'
import { getFormattedSongTime } from '../../TimeFormatter'
import { play, stop } from '../../reducers/mediaSlice'
import { queueSong, removeSong, setPlaylistPlaying, unqueueSong } from '../../reducers/librarySlice'
import { setModalData } from '../../reducers/modalSlice'

import DirectoryEntry from './generic-components/DirectoryEntry'
import SliderComponent from '../media-components/SliderComponent'

const SongDirectoryEntry = ({ currentDirectory, ...props }) => {
    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const isThisSongQueued = queuedSong.id === props.song.id
    const sliderValueOfSongTime = Math.round((media.time / media.maxTime) * 100)

    const library = useSelector(state => state['library'])

    const deleteEntry = () => {
        if (queuedSong.id === props.song.id) {
            props.dispatch(stop())
            props.dispatch(unqueueSong())
        }
        // A song directory entry can be in the songs directory
        // or in a playlist directory
        const songsDirectory = directories.songs.identifier
        if (currentDirectory === songsDirectory) {
            URL.revokeObjectURL(props.song.src)
        }
        props.dispatch(removeSong({from: currentDirectory, songId: props.song.id}))
    }

    const currentModalData = useSelector(state => state['modal'].modalData)
    useEffect(() => {
        if (currentModalData.id === props.song.id) {
            deleteEntry()
            props.dispatch(setModalData({}))
        }
    }, [currentModalData])

    const handleEntryClick = () => {
        queueClickedSong()
        setWorkingPlaylist()
    }

    const queueClickedSong = () => {
        props.dispatch(stop())
        props.dispatch(queueSong(props.song))
        props.dispatch(play())
    }

    const setWorkingPlaylist = () => {
        if (props.isInPlaylist) {
            props.dispatch(setPlaylistPlaying(library.openedPlaylist.id))
        } else {
            props.dispatch(setPlaylistPlaying(undefined))
        }
    }

    return (
        (
            <DirectoryEntry
                entry={props.song}
                className='btn directory-entry'
                onClick={handleEntryClick}
                contextoptions={[contextMenuOptions._queue, contextMenuOptions._delete]}
            >
                <h4 className='song-entry-title song-entry-info'>{props.song.title}</h4>
                <p className='song-entry-artist song-entry-info'>{props.song.artist}</p>
                <p className='song-entry-duration'>{getFormattedSongTime(props.song.duration)}</p>

                <SliderComponent
                    name='mini-song-bar'
                    orientation='horizontal'
                    sliderPercent={(isThisSongQueued && sliderValueOfSongTime) || 0}
                />
            </DirectoryEntry>
        )
    )
}

export default SongDirectoryEntry