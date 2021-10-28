import React from 'react'

import { uploadSong } from './SongUploaderHelper'

// Component
const SongUploader = props => {

    const uploadSongs = event => {
        const uploader = event.target
        const uploadedData = [ ...uploader.files ]

        uploadedData.forEach(song => uploadSong(props.uploadTo, song))
    }

    return (
        <input
            id='upload-song'
            style={{ display: 'none' }}
            type='file'
            multiple
            onChange={uploadSongs}
        />
    )
}

export default SongUploader