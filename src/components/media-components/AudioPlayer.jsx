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
            props.dispatch(stop())

            if (library.playlistPlaying) {
                const randomSong = chooseRandomSongFromPlaylist(library.playlistPlaying)
                props.dispatch(queueSong(randomSong))
            } else {
                const randomSong = chooseRandomSongFromSongs()
                props.dispatch(queueSong(randomSong))
            }

            props.dispatch(play())
        } else if (props.media.loop) {
            const { current: audio } = audioRef
            // resets audio time to 0
            props.dispatch(play())
            audio.play()
        }
    }

    const randomNumFromArr = arrLen =>
        /* keeps from selecting index larger than arr */
        Math.round(Math.random() * (arrLen - 1) )

    const chooseRandomSongFromSongs = () => library.songs[randomNumFromArr(library.songs.length)]

    const chooseRandomSongFromPlaylist = playlistId => {
        const playlist = library.playlists.find(playlist => playlist.id === playlistId)

        const pickedSong = playlist.songs[randomNumFromArr(playlist.songs.length)]

        if (pickedSong.id === props.queuedSong.id) {
            return chooseRandomSongFromPlaylist(playlistId)
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
        autoPlay
        ref={audioRef}
        onLoadedMetadata={loadAudio}
        onTimeUpdate={determineSongTime}
        onEnded={handleAudioEnd}
    />
}

export default AudioPlayer