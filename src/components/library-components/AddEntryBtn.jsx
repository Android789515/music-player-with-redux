import React, { useRef, useState } from 'react'

import {
    addBtn,
    addBtnHover as hover,
    addBtnActive as active
} from '../../css/modules/buttons/AddBtn.module.scss'
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

    const [ isClicked, setIsClicked ] = useState(false)
    const setActiveClass = () => setIsClicked(true)
    const clearActiveClass = () => setIsClicked(false)

    const [ isHovered, setIsHovered ] = useState(false)
    const setHoverClass = () => setIsHovered(true)
    const clearHoverClass = () => setIsHovered(false)

    const clearPseudoClasses = () => {
        clearHoverClass()
        clearActiveClass()
    }

    return (
        <div
            className={`btn ${addEntrySection}`}
            onClick={addEntry}
            onMouseDown={setActiveClass}
            onMouseUp={clearActiveClass}
            onMouseEnter={setHoverClass}
            onMouseLeave={clearPseudoClasses}
        >
            <button className={`btn ${addBtn} ${isClicked ? active : ''} ${isHovered ? hover : ''}`}>+</button>
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