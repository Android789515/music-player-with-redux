import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'
import { setModalContent } from '../../../reducers/modalSlice'

// Modal renders a special prompt component that will vary
const Modal = () => {
    const modal = useSelector(state => state['modal'])
    const dispatch = useDispatch()

    const handleKeyDown = ({ key }) => {
        if (key === 'Escape' || key === 'Enter') {
            dispatch(setModalContent(undefined))
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown)

        return () => document.body.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div
            className={`modal ${modal.modalContent ? '' : 'hidden'}`.trim()}
            onKeyDown={handleKeyDown}
        >
            {modal.modalContent}
        </div>
    )
}

export const modalCommands = {
    _CREATE_PLAYLIST: 'create-playlist',
    _DELETE_ENTRY: 'delete-entry'
}

export default Modal