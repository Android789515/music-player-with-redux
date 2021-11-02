import React, { useRef } from 'react'

import '../../css/library-styles/add-entry-styles.scss'

import SongUploader from './SongUploader'
import { openModal, setModalContent } from '../../reducers/modalSlice'
import CreatePlaylistModal from './modals/CreatePlaylistModal'

const AddEntryBtn = props => {
    const uploaderRef = useRef(undefined)

    const uploadOrCreateEntry = () => {
        const uploader = uploaderRef.current
        if (uploader) {
            uploader.click()
        } else {
            renderCreatePlaylistModal()
        }
    }

    const renderCreatePlaylistModal = async () => {
        await props.dispatch(setModalContent(<CreatePlaylistModal />))
        props.dispatch(openModal())
    }

    return (
        <div className='btn add-entry-section' onClick={uploadOrCreateEntry}>
            <button className='btn'>+</button>
            <p className={`add-entry-text`}>{props.btnText}</p>

            {props.hasInputComponent && (
                <SongUploader
                    uploadTo={props.uploadTo}
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