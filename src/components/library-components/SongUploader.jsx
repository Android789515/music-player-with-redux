import React, { useEffect, useState } from 'react'

import { openUploadScreen, uploadSongs } from './SongUploaderHelper'

// Component
const SongUploader = props => {
    const [ urlsToCleanUp, updateUrlsToCleanUp ] = useState([])

    // Might want to change this for when data will eventually be saved
    useEffect(() => {
        return () => {
            urlsToCleanUp.forEach(url => {
                URL.revokeObjectURL(url)
            })
        }
    }, [])

    return (
        <input
            id='upload-song'
            style={{ display: 'none' }}
            type='file'
            multiple
            // onClick={openUploadScreen}
            onChange={() => uploadSongs(props.uploadTo, props, updateUrlsToCleanUp)}
        />
    )
}

export default SongUploader