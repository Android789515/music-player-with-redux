import React, { useRef } from 'react'

import { addBtn } from '../../css/modules/AddBtn.module.scss'
import { addEntrySection } from '../../css/modules/library/AddEntry.module.scss'

import { setModalContent } from '../../reducers/modalSlice'

import SongUploader from './SongUploader'
import PlaylistModal from '../modals/PlaylistModal'
import AddToPlaylistModal from '../modals/AddToPlaylistModal'

const AddEntryBtn = props => {
    const uploaderRef = useRef(undefined)

    const addEntry = () => {
        const uploader = uploaderRef.current
        if (uploader) {
            uploader.click()
        } else if (props.isPlaylistOpen) {
            renderAddToPlaylistModal()
        } else {
            renderCreatePlaylistModal()
        }
    }

    const renderAddToPlaylistModal = () => {
        props.dispatch(setModalContent(<AddToPlaylistModal />))
    }

    const renderCreatePlaylistModal = () => {
        props.dispatch(setModalContent(<PlaylistModal action='create' />))
    }

    return (
        <div className={`btn ${addEntrySection}`} onClick={addEntry}>
            <button className={`btn ${addBtn}`}>+</button>
            <p>{props.btnText}</p>

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