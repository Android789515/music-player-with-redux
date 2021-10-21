import { addSong } from '../../reducers/librarySlice'

export const openUploadScreen = () => document.getElementById('upload-song').click()

const getID3Tags = song => {
    const readID3Tags = new FileReader()
    const id3Bytes = song.slice(song.size - 128)
    let bytes
    let tags = {}
    readID3Tags.onload = () => {
        bytes = readID3Tags.result
        const data = new DataView(bytes)
        const songHasID3Tags = parseString(data, 0, 3) === 'TAG'

        if (songHasID3Tags) {
            tags = {
                tag: parseString(data, 0, 3),
                title: parseString(data, 3, 30),
                artist: parseString(data, 33, 30)
            }
            // TBA
            // const album = readString(data, 63, 30)
            // const year = readString(data, 93, 4)
        }
    }
    readID3Tags.readAsArrayBuffer(id3Bytes)

    return tags
}

const parseString = (data, offset, len) => {
    const iterable = [...Array(offset + len).keys()]
    return iterable.reduce((string, charIndex) =>
        string + String.fromCharCode(data.getUint8(charIndex)), '')
}

export const uploadSongs = (props, updateUrlsToCleanUp) => {
    const uploader = document.getElementById('upload-song')
    const uploadedData = [...uploader.files]

    uploadedData.forEach((song, index) => {
        const songUrl = URL.createObjectURL(song)

        const songMetaData = getID3Tags(song)

        const audio = document.createElement('audio')
        audio.src = songUrl

        audio.onloadeddata = event => {
            const audioDuration = event.target.duration
            const songName = song.name.split('.mp3')[0]
            const formattedSong = {
                id: index,
                title: songMetaData.title || songName,
                artist: songMetaData.artist || 'Unknown Artist',
                src: songUrl,
                duration: audioDuration
            }
            props.dispatch(addSong({ to: 'songs', song: formattedSong }))
        }
        audio.load()
        audio.remove()
        updateUrlsToCleanUp(originalUrls => [...originalUrls, songUrl])
    })
}