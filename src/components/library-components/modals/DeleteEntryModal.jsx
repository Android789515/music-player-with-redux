import React from 'react'
import { useDispatch } from 'react-redux'
import { clearModal, setModalData } from '../../../reducers/modalSlice'

import '../../../css/modal-styles.scss'

export const modalDataForDeleting = {
    _CONFIRM_DELETE: 'confirm-delete'
}

const DeleteEntryModal = entry => {
    const entryName = entry.name || entry.title
    const dispatch = useDispatch()

    const proceedWithDelete = () => {
        dispatch(setModalData(modalDataForDeleting._CONFIRM_DELETE))

        dispatch(clearModal())
    }

    const cancelDelete = () => {
        dispatch(clearModal())
    }

    return (
        <div className='delete-entry-modal modal-content hard-rounded-corners'>
            <h2>Are you sure you would like to delete {entryName}?</h2>

            <p>
                <button className='modal-btn-bg hard-rounded-corners' >
                    <span
                        className='btn no-btn hard-rounded-corners'
                        onClick={cancelDelete}
                    >
                        No
                    </span>
                </button>
            </p>

            <p>
                <button className='modal-btn-bg hard-rounded-corners' >
                    <span
                        className='btn yes-btn hard-rounded-corners'
                        onClick={proceedWithDelete}
                    >
                        Yes
                    </span>
                </button>
            </p>
        </div>
    )
}

export default DeleteEntryModal