import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'

import { addPlaylist } from '../../../reducers/librarySlice'
import { setModalContent } from '../../../reducers/modalSlice'

const CreatePlaylistModal = () => {
    const [ modalText, updateModalText ] = useState('')

    const dispatch = useDispatch()
    const playlists = useSelector(state => state['library'].playlists)

    const submit = () => {
        const isValidName = modalText.trim()

        if (isValidName) {
            dispatch(addPlaylist({
                id: playlists.length,
                name: modalText,
                songs: []
            }))
        }
        updateModalText('')

        dispatch(setModalContent(undefined))
    }

    return (
        <label className='create-playlist-modal modal-content hard-rounded-corners'>
            Enter a playlist name:
            <input
                id='create-playlist-input'
                type='text'
                onChange={event => updateModalText(() => event.target.value)}
                value={modalText}
                onKeyPress={({ key }) => key === 'Enter' && submit()}
            />
        </label>
    )
}

export default CreatePlaylistModal