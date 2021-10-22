import React from 'react'
import { useSelector } from 'react-redux'

import { play, stop } from '../../reducers/mediaSlice'
import { getFormattedSongTime } from '../../TimeFormatter'
import DirectoryEntry from './DirectoryEntry'
import SliderComponent from '../media-components/SliderComponent'

const SongDirectoryEntry = props => {
    const media = useSelector(state => state['media'])
    const queuedSong = useSelector(state => state['library'].queuedSong)
    const doesQueuedSongMatchThisSong = queuedSong.id === props.song.id
    const sliderValueOfSongTime = media.time / media.maxTime
    // console.log(sliderValueOfSongTime)

    return (
        (
            <DirectoryEntry
                entry={props.song}
                className='btn directory-entry'
                onClick={() => {
                    props.dispatch(stop())
                    props.doOnClick()
                    props.dispatch(play())
                }}
            >
                <h4 className='song-entry-title song-entry-info'>{props.song.title}</h4>
                <p className='song-entry-artist song-entry-info'>{props.song.artist}</p>
                <p className='song-entry-duration'>{getFormattedSongTime(props.song.duration)}</p>

                {doesQueuedSongMatchThisSong &&
                <SliderComponent orientation='horizontal' sliderPercent={sliderValueOfSongTime} />}
            </DirectoryEntry>
        )
    )
}

export default SongDirectoryEntry