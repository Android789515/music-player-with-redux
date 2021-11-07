import React, { useEffect, useRef } from 'react'

import { pause, updateTime, setMaxTime, play } from '../../reducers/mediaSlice'

function AudioPlayer(props) {
    const audioRef = useRef(undefined)

    const loadAudio = event => {
        const audio = event.target
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

        // If loop enabled (shuffle overrides loop), restart song
        if (!props.media.shuffle && props.media.loop) {
            const { current: audio } = audioRef
            // resets audio time to 0
            props.dispatch(play())
            audio.play()
        }
    }

    useEffect( () => {
        const { current: audio } = audioRef
        console.log(props.media.paused)
        if (props.media.paused) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [props.media.paused])

    useEffect( () => {
        const { current: audio } = audioRef
        audio.volume = props.media.volume
    }, [props.media.volume])

    return <audio
        id='audio'
        muted={props.media.muted}
        src={props.queuedSong.src}
        autoPlay={true}
        ref={audioRef}
        onLoadedMetadata={loadAudio}
        onTimeUpdate={determineSongTime}
        onEnded={handleAudioEnd}
    />
}

export default AudioPlayer