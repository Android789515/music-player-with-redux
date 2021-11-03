import React from 'react'
import { useDispatch } from 'react-redux'

import '../../../css/modal-styles.scss'

const DeleteEntryModal = props => {
    const dispatch = useDispatch()

    const proceedWithDelete = () => {
    }

    const cancelDelete = () => {
    }

    return (
        <div className='delete-entry-modal modal-content hard-rounded-corners'>
            <h2>Are you sure you would like to delete {props.entryName}?</h2>

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