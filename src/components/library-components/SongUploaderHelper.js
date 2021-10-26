import store from '../../store'

import { addSong } from '../../reducers/librarySlice'

export const openUploadScreen = () => document.getElementById('upload-song').click()

export const uploadSongs = (uploadTo, props, updateUrlsToCleanUp) => {
    const uploader = document.getElementById('upload-song')
    const uploadedData = [...uploader.files]

    uploadedData.forEach((song, index) => {
        const songUrl = URL.createObjectURL(song)
        const audio = document.createElement('audio')
        audio.src = songUrl

        audio.onloadeddata = event => {
            // Start the index after the last song entry
            const songs = store.getState().library.songs
            index = index + songs.length

            getID3Tags(uploadTo, event, song, index, songUrl)
        }
        audio.load()
        audio.remove()
        updateUrlsToCleanUp(originalUrls => [...originalUrls, songUrl])
    })
}

function getID3Tags(uploadTo, event, song, idForSong, songUrl) {
    const audioDuration = event.target.duration
    const songTitleFallback = song.name.split('.')[0]

    const jsmediatags = require('jsmediatags')
    new jsmediatags.Reader(song)
        .setTagsToRead(['title', 'artist'])
        .read({
            onSuccess: metadata => {
                const tags = metadata.tags
                const formattedSong = {
                    id: idForSong,
                    title: tags.title || songTitleFallback,
                    artist: tags.artist || 'Unknown Artist',
                    src: songUrl,
                    duration: audioDuration
                }
                store.dispatch(addSong({ to: uploadTo, song: formattedSong }))
            },
            onError: error => {
                console.error(error)

                const formattedSong = {
                    id: idForSong,
                    title: songTitleFallback,
                    artist: 'Unknown Artist',
                    src: songUrl,
                    duration: audioDuration
                }
                store.dispatch(addSong({ to: 'songs', song: formattedSong }))
            }
        })
}

function getAllID3Tags(song) {
    const jsmediatags = require('jsmediatags')
    jsmediatags.read(song, {
        onSuccess: metadata => {
            console.log(metadata)
        },
        onError: error => console.error(error)
    })
}