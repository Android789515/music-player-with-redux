import React from 'react'

import { uploadSongs } from './SongUploaderHelper'

// Component
const SongUploader = props => {

    const addSongs = event => {
        const uploader = event.target
        const uploadedData = [ ...uploader.files ]

        uploadedData.forEach(song => uploadSongs(song))
    }

    return (
        <input
            style={{ display: 'none' }}
            type='file'
            multiple
            onChange={addSongs}
            ref={props.uploaderRef}
        />
    )
}

export default SongUploader