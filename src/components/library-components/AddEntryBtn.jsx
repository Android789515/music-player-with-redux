import React, { useRef } from 'react'

import '../../css/library-styles/add-entry-styles.scss'

import { setModalContent } from '../../reducers/modalSlice'

import SongUploader from './SongUploader'
import PlaylistModal from './modals/PlaylistModal'

const AddEntryBtn = props => {
    const uploaderRef = useRef(undefined)

    const addEntry = () => {
        const uploader = uploaderRef.current
        if (uploader) {
            uploader.click()
        } else if (props.isPlaylistOpen) {

        } else {
            renderCreatePlaylistModal()
        }
    }

    const renderAddToPlaylistModal = () => {

    }

    const renderCreatePlaylistModal = () => {
        props.dispatch(setModalContent(<PlaylistModal action='create' />))
    }

    return (
        <div className='btn add-entry-section' onClick={addEntry}>
            <button className='btn'>+</button>
            <p className={`add-entry-text`}>{props.btnText}</p>

            {props.hasInputComponent && (
                <SongUploader
                    uploaderRef={uploaderRef}
                    dispatch={props.dispatch}
                />
            )}
        </div>
    )
}

AddEntryBtn.defaultProps = {
    uploadTo: 'songs'
}

export default AddEntryBtn