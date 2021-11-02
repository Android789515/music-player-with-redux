import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'
import { closeModal } from '../../../reducers/modalSlice'

// Modal renders a special prompt component that will vary
const Modal = () => {
    const modal = useSelector(state => state['modal'])
    const dispatch = useDispatch()

    const handleKeyDown = ({ key }) => {
        if (key === 'Escape' || key === 'Enter') {
            dispatch(closeModal())
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown)

        return () => document.body.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div
            className={`modal ${modal.isOpen ? '' : 'hidden'}`.trim()}
            onKeyDown={handleKeyDown}
        >
            {modal.modalContent}
        </div>
    )
}

export default Modal