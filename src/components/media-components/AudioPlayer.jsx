import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { pause, updateTime, setMaxTime, play, stop } from '../../reducers/mediaSlice'
import { queueSong } from '../../reducers/librarySlice'

function AudioPlayer(props) {
    const library = useSelector(state => state['library'])
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
        if (props.media.shuffle) {
            // Get working directory first
            // then get the amount of songs in it
            // Choose a random one and queue it
            const randomSong = randomNumFromArr(library.songs.length)
            props.dispatch(stop())
            props.dispatch(queueSong(library.songs.at(randomSong)))
            props.dispatch(play())
        } else if (props.media.loop) {
            const { current: audio } = audioRef
            // resets audio time to 0
            props.dispatch(play())
            audio.play()
        }
    }

    const randomNumFromArr = arrLen => Math.round(Math.random() * arrLen)

    const chooseRandomSongFromSongs = () => randomNumFromArr(library.songs.length)

    const chooseRandomSongFromPlaylist = playlistId => {
        const playlist = library.playlists.find(playlist => playlist.id === playlistId)

        const pickedSong = randomNumFromArr(playlist.length)

        if (pickedSong.id === props.queuedSong.id) {
            chooseRandomSongFromPlaylist(playlistId)
        } else {
            return pickedSong
        }
    }

    useEffect( () => {
        const { current: audio } = audioRef
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


    // Loop
    // useEffect( () => {
    //     console.log(props.media.loop)
    // }, [props.media.loop])

    // Shuffle
    // useEffect( () => {
    //
    // }, [])

    return <audio
        id='audio'
        muted={props.media.muted}
        src={props.queuedSong.src}
        // autoPlay
        ref={audioRef}
        onLoadedMetadata={loadAudio}
        onTimeUpdate={determineSongTime}
        onEnded={handleAudioEnd}
    />
}

export default AudioPlayer