import React from 'react'
import { useSelector } from 'react-redux'

import { directories } from './DirectoryList'
import { contextMenuOptions } from './generic-components/ContextMenu'
import { customEvents } from '../../events'
import { getFormattedSongTime } from '../../TimeFormatter'
import { play, stop } from '../../reducers/mediaSlice'
import { queueSong, removeSong, unqueueSong } from '../../reducers/librarySlice'
import { setModalContent, setModalData } from '../../reducers/modalSlice'

import DirectoryEntry from './generic-components/DirectoryEntry'
import SliderComponent from '../media-components/SliderComponent'
import DeleteEntryModal, { modalDataForDeleting } from './modals/DeleteEntryModal'

const SongDirectoryEntry = ({ currentDirectory, ...props }) => {
    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const isThisSongQueued = queuedSong.id === props.song.id
    const sliderValueOfSongTime = Math.round((media.time / media.maxTime) * 100)
    const currentModalData = useSelector(state => state['modal'].modalData)

    const deleteEntry = event => {
        // event.target.removeEventListener(customEvents.deleteRequest, deleteEntry)
        // ask if sure they want to delete
        renderDeleteEntryModal()


        // if yes then execute below
        if (currentModalData === modalDataForDeleting._CONFIRM) {
            props.dispatch(setModalData(undefined))
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
    }

    const renderDeleteEntryModal = () => {
        props.dispatch(setModalContent(<DeleteEntryModal entry={props.song} />))
    }

    const queueClickedSong = () => {
        props.dispatch(stop())
        props.dispatch(queueSong(props.song))
        props.dispatch(play())
    }

    return (
        (
            <DirectoryEntry
                entry={props.song}
                className='btn directory-entry'
                onClick={queueClickedSong}
                deleteEntry={deleteEntry}
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