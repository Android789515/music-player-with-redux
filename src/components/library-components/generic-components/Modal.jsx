import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import '../../../css/modal-styles.scss'
import store from '../../../store'
import { closeModal } from '../../../reducers/modalSlice'

// Modal renders a special prompt component that will vary
const Modal = props => {
    const modal = store.getState().modal
    const dispatch = useDispatch()

    const handleKeyDown = ({ key }) => {
        if (key === 'Escape' || key === 'Enter') {
            dispatch(closeModal())
        }
    }

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