import React, { useEffect, useState } from 'react'

import { openUploadScreen, uploadSongs } from './SongUploaderHelper'

// Component
const SongUploader = props => {
    const [ urlsToCleanUp, updateUrlsToCleanUp ] = useState([])


    useEffect(() => {
        return () => {
            urlsToCleanUp.forEach(url => {
                URL.revokeObjectURL(url)
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <input
            id='upload-song'
            style={{ display: 'none' }}
            type='file'
            multiple
            onClick={openUploadScreen}
            onChange={() => uploadSongs(props.uploadTo, props, updateUrlsToCleanUp)}
        />
    )
}

export default SongUploader