import React, { useEffect } from 'react'

import {pause, updateTime, setMaxTime, play} from '../../reducers/mediaSlice'
import {queueSong} from '../../reducers/librarySlice'
import {useSelector} from 'react-redux'

function AudioPlayer(props) {
    const loadSong = audio => {
        if (audio.src) {
            audio.volume = props.media.volume
            props.dispatch(setMaxTime(props.queuedSong.duration))

            if (props.media.paused) {
                audio.pause()
            } else {
                audio.play()
            }

            audio.ontimeupdate = event => {
                const audioElement = event.target
                const timeFastForwarded = props.media.time > audioElement.currentTime
                const timeRewound = props.media.time + 1 < audioElement.currentTime

                if (timeFastForwarded || timeRewound) {
                    audioElement.currentTime = props.media.time
                } else {
                    props.dispatch(updateTime(audioElement.currentTime))
                }
            }
            audio.onended = () => {
                props.dispatch(pause())

                if (props.media.shuffle) {

                } else if (props.media.loop) {
                    props.dispatch(play())
                }
            }
        }
    }

    useEffect(() => {
        const audio = document.getElementById('audio')
        loadSong(audio, props.media.volume)

    }, [props.media.paused, props.media.time, props.media.volume, props.media.loop, props.media.shuffle])

    return <audio id='audio' muted={props.media.muted} src={props.queuedSong.src} />
}

export default AudioPlayer