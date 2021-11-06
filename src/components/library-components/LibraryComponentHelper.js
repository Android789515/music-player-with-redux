import store from '../../store'
import { play, stop } from '../../reducers/mediaSlice'
import { queueSong } from '../../reducers/librarySlice'

const library = store.getState().library
const dispatch = store.dispatch

const randomNumFromArr = arrLen =>
    /* keeps from selecting index larger than arr */
    Math.round(Math.random() * (arrLen - 1) )

const chooseRandomSongFromSongs = () => library.songs[randomNumFromArr(library.songs.length)]

const chooseRandomSongFromPlaylist = playlistId => {
    const playlist = library.playlists.find(playlist => playlist.id === playlistId)

    const pickedSong = playlist.songs[randomNumFromArr(playlist.songs.length)]

    if (pickedSong.id === library.queuedSong.id) {
        return chooseRandomSongFromPlaylist(playlistId)
    } else {
        return pickedSong
    }
}

export const queueRandomSong = () => {
    dispatch(stop())

    if (library.playlistPlaying) {
        const randomSong = chooseRandomSongFromPlaylist(library.playlistPlaying)
        dispatch(queueSong(randomSong))
    } else {
        const randomSong = chooseRandomSongFromSongs()
        dispatch(queueSong(randomSong))
    }

    dispatch(play())
}