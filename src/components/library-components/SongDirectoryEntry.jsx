import React from 'react'
import { useSelector } from 'react-redux'

import { play, stop } from '../../reducers/mediaSlice'
import { getFormattedSongTime } from '../../TimeFormatter'
import DirectoryEntry from './generic-components/DirectoryEntry'
import SliderComponent from '../media-components/SliderComponent'
import { queueSong } from '../../reducers/librarySlice'

const SongDirectoryEntry = props => {
    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const doesQueuedSongMatchThisSong = queuedSong.id === props.song.id
    const sliderValueOfSongTime = Math.round((media.time / media.maxTime) * 100)

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
                contextOptions={['delete']}
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