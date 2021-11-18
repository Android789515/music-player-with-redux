import React from 'react'
import { useDispatch } from 'react-redux'
import { clearModal, setModalData } from '../../reducers/modalSlice'

import '../../css/modal-styles.scss'
import ModalBtn from '../library-components/generic-components/ModalBtn'

const DeleteEntryModal = ({ entry }) => {
    const entryName = entry.name || entry.title
    const dispatch = useDispatch()

    const proceedWithDelete = () => {
        dispatch(setModalData({
            confirmDelete: true,
            id: entry.id
        }))

        dispatch(clearModal())
    }

    const cancelDelete = () => {
        dispatch(clearModal())
    }

    return (
        <div className='delete-entry-modal modal-content hardRoundedCorners'>
            <h2>Are you sure you would like to delete {entryName}?</h2>

            <p>
                <ModalBtn doOnClick={cancelDelete} btnText='No' />
            </p>

            <p>
                <ModalBtn doOnClick={proceedWithDelete} btnText='Yes' />
            </p>
        </div>
    )
}

export default DeleteEntryModal