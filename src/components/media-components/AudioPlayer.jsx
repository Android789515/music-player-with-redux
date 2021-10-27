import React, { useEffect } from 'react'

import { pause, updateTime, setMaxTime } from '../../reducers/mediaSlice'

function AudioPlayer(props) {

    const loadAudio = audio => {
        audio.volume = props.media.volume
        props.dispatch(setMaxTime(props.queuedSong.duration))

        audio.play()
    }

    const determineSongTime = event => {
        const audio = event.target
        const timeFastForwarded = props.media.time > audio.currentTime
        const timeRewound = props.media.time + 1 < audio.currentTime

        if (timeFastForwarded || timeRewound) {
            audio.currentTime = props.media.time
        } else {
            props.dispatch(updateTime(audio.currentTime))
        }
    }

    const handleAudioEnd = () => {
        props.dispatch(pause())
    }

    useEffect( () => {
        const audio = document.getElementById('audio')
        const shouldLoadAudio = props.queuedSong.src !== undefined
        shouldLoadAudio && loadAudio(audio)
    }, [props.queuedSong.src])

    useEffect( () => {
        const audio = document.getElementById('audio')
        if (props.media.paused) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [props.media.paused])

    useEffect( () => {
        const audio = document.getElementById('audio')
        audio.volume = props.media.volume
    }, [props.media.volume])


    // Loop
    // useEffect( () => {
    //
    // }, [])

    // Shuffle
    // useEffect( () => {
    //
    // }, [])

    return <audio
        id='audio'
        muted={props.media.muted}
        src={props.queuedSong.src}
        onTimeUpdate={determineSongTime}
        onEnded={handleAudioEnd}
    />
}

export default AudioPlayer