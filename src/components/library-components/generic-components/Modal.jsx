import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'
import { setModalContent } from '../../../reducers/modalSlice'

// Modal renders a special prompt component that will vary
const Modal = () => {
    const modalContent = useSelector(state => state['modal'].modalContent)
    const dispatch = useDispatch()

    const handleKeyDown = ({ key }) => {
        if (key === 'Escape') {
            dispatch(setModalContent(undefined))
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown)

        return () => document.body.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div
            className={`modal ${modalContent ? '' : 'hidden'}`.trim()}
            onKeyDown={handleKeyDown}
        >
            {modalContent}
        </div>
    )
}

export const modalCommands = {
    _CREATE_PLAYLIST: 'create-playlist',
    _DELETE_ENTRY: 'delete-entry'
}

export default Modal