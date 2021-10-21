import React, { useEffect } from 'react'

import { pause, updateTime, setMaxTime } from '../../reducers/mediaSlice'

function AudioPlayer(props) {
    const loadSong = audio => {
        audio.volume = props.media.volume
        props.dispatch(setMaxTime(props.queuedSong.duration))
    }

    useEffect(() => {
        const audio = document.getElementById('audio')
        loadSong(audio, props.media.volume)

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
        }
    }, [props.media.paused, props.media.time, props.media.volume])

    return <audio id='audio' muted={props.media.muted} src={props.queuedSong.src} />
}

export default AudioPlayer