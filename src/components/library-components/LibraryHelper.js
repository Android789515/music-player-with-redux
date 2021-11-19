import { play, stop } from '../../reducers/mediaSlice'
import { queueSong } from '../../reducers/librarySlice'

const randomNumFromArr = arrLen => {
    /* keeps from selecting index larger than arr */
    const num = Math.round(Math.random() * (arrLen - 1) )
    // Prevents negative indices
    return Math.abs(num)
}


const chooseRandomSongFromSongs = library => {
    return library.songs[randomNumFromArr(library.songs.length)]
}

const chooseRandomSongFromPlaylist = (library, playlistId) => {
    const playlist = library.playlists.find(playlist => playlist.id === playlistId)

    const pickedSong = playlist.songs[randomNumFromArr(playlist.songs.length)]

    if (pickedSong.id === library.queuedSong.id) {
        return chooseRandomSongFromPlaylist(playlistId)
    } else {
        return pickedSong
    }
}

export const queueRandomSong = (library, dispatch) => {
    dispatch(stop())

    if (library.playlistPlaying) {
        const randomSong = chooseRandomSongFromPlaylist(library, library.playlistPlaying)
        dispatch(queueSong(randomSong))
    } else {
        const randomSong = chooseRandomSongFromSongs(library)
        dispatch(queueSong(randomSong))
    }

    dispatch(play())
}