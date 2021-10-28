import store from '../../store'
import jsmediatags from 'jsmediatags'
import { v4 as uuidv4 } from 'uuid'

import { addSong } from '../../reducers/librarySlice'

export const uploadSong = (location, song) => {
    createSongObject(song).then(songObj => {
        store.dispatch(addSong({ to: location, song: songObj}))
    })
}

const createSongObject = async song => {
    const tags = await getSongTags(song)
    const id = uuidv4()
    const url = URL.createObjectURL(song)
    const duration = await getSongDuration(song, url).then(duration => duration)

    return {
        id: id,
        title: createSongTitle(song, tags),
        artist: tags.artist || 'Unknown Artist',
        src: url,
        duration: duration
    }
}

const getSongTags = song => {
    const songReader = new jsmediatags.Reader(song)
        .setTagsToRead([ 'title', 'artist' ])
    const getTags = new Promise((resolve, reject) => {
        songReader.read({
            onSuccess: data => resolve(data.tags),
            onError: error => reject(error)
        })
    })
    return getTags.then(tags => tags)
}

const createSongTitle = (song, tags) => {
    const songTitleFallback = song.name.split('.')[0]

    return tags.title || songTitleFallback
}

const getSongDuration = async (song, url) => {
    const tempAudio = new Audio(url)
    tempAudio.preload = 'metadata'

    tempAudio.addEventListener('loadedmetadata', loadSongMetadata)
    await tempAudio.play()

    tempAudio.pause()
    tempAudio.removeEventListener('loadedmetadata', loadSongMetadata)

    return tempAudio.songDuration
}

const loadSongMetadata = event => {
    event.target.songDuration = event.target.duration
}