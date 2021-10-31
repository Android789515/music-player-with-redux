import React from 'react'
import { useSelector } from 'react-redux'

import { directories } from './DirectoryList'
import { getFormattedSongTime } from '../../TimeFormatter'
import { play, stop } from '../../reducers/mediaSlice'
import { queueSong, removeSong, unqueueSong } from '../../reducers/librarySlice'

import DirectoryEntry from './generic-components/DirectoryEntry'
import SliderComponent from '../media-components/SliderComponent'

const SongDirectoryEntry = props => {
    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const doesQueuedSongMatchThisSong = queuedSong.id === props.song.id
    const sliderValueOfSongTime = Math.round((media.time / media.maxTime) * 100)

    const deleteEntry = event => {
        event.target.removeEventListener('deleterequest', deleteEntry)
        props.dispatch(stop())
        props.dispatch(unqueueSong())
        const parentDirectory = getParentDirectory(event)
        if (parentDirectory === directories.songs.identifier) {
            URL.revokeObjectURL(props.song.src)
        }

        props.dispatch(removeSong({from: parentDirectory, songId: props.song.id}))
    }

    const getParentDirectory = event => {
        const parentDirectory = event.target.closest('.directory')
        const directoryChecks = new Map([
            [parentDirectory.className.indexOf('songs'), 'songs'],
            [parentDirectory.className.indexOf('opened-playlist'), 'openedPlaylist']
        ])
        const directoryMatch = [...directoryChecks.entries()].find( ([check]) => check !== -1).at(-1)

        return directoryMatch
    }

    return (
        (
            <DirectoryEntry
                entry={props.song}
                className='btn directory-entry'
                onClick={() => {
                    props.dispatch(stop())
                    props.dispatch(queueSong(props.song))
                    props.dispatch(play())
                }}
                deleteEntry={deleteEntry}
                contextoptions={['queue', 'delete']}
            >
                <h4 className='song-entry-title song-entry-info'>{props.song.title}</h4>
                <p className='song-entry-artist song-entry-info'>{props.song.artist}</p>
                <p className='song-entry-duration'>{getFormattedSongTime(props.song.duration)}</p>

                <SliderComponent
                    name='mini-song-bar'
                    orientation='horizontal'
                    sliderPercent={(doesQueuedSongMatchThisSong && sliderValueOfSongTime) || 0}
                />
            </DirectoryEntry>
        )
    )
}

export default SongDirectoryEntry