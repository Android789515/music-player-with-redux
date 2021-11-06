import store from '../../store'
import jsmediatags from 'jsmediatags'
import { v4 as uuidv4 } from 'uuid'

import { addSong } from '../../reducers/librarySlice'
import { directories } from './DirectoryList'

export const uploadSong = async song => {
    const songObj = await createSongObject(song)

    const songsDirectory = directories.songs.identifier
    store.dispatch(addSong({ to: songsDirectory, song: songObj}))
}

const createSongObject = async song => {
    const tags = await getSongTags(song)
    const id = uuidv4()
    const url = URL.createObjectURL(song)
    const coverArt = tags.picture && decodeSongPicture(tags.picture)
    const duration = await getSongDuration(song, url).then(duration => duration)

    return {
        id: id,
        title: createSongTitle(song, tags),
        artist: tags.artist || 'Unknown Artist',
        src: url,
        coverArt: coverArt,
        duration: duration
    }
}

const getSongTags = song => {
    const songReader = new jsmediatags.Reader(song)
        .setTagsToRead([ 'title', 'artist', 'picture' ])
    const getTags = new Promise((resolve, reject) => {
        songReader.read({
            onSuccess: data => resolve(data.tags),
            onError: error => reject(error)
        })
    })
    // return an empty object if no tag reader could be provided
    // that way properties such as title aren't read from an undefined value
    return getTags.then(tags => tags).catch(() => { return {} })
}

const createSongTitle = (song, tags) => {
    const songTitleFallback = song.name.split('.')[0]

    return tags.title || songTitleFallback
}

const decodeSongPicture = picture => {
    const { data, format } = picture
    const base64String = data.reduce((result, byte) => result + String.fromCharCode(byte),'')

    return `data:${format};base64,${window.btoa(base64String)}`
}

// Annoying but a nice work around to grab audio
// duration and save it
const forceAudioLoad = async audio => {
    audio.volume = 0
    await audio.play()

    audio.pause()
}

const getSongDuration = async (song, url) => {
    const tempAudio = new Audio(url)
    tempAudio.preload = 'metadata'

    tempAudio.addEventListener('loadedmetadata', loadSongMetadata)
    // Force the audio to load and gain access to
    // the duration
    await forceAudioLoad(tempAudio)
    tempAudio.removeEventListener('loadedmetadata', loadSongMetadata)

    return tempAudio.songDuration
}

const loadSongMetadata = event => {
    event.target.songDuration = event.target.duration
}