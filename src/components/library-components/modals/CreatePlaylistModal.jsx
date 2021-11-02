import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'

import { addPlaylist } from '../../../reducers/librarySlice'

const CreatePlaylistModal = () => {
    const [ modalText, updateModalText ] = useState('')

    const dispatch = useDispatch()
    const playlists = useSelector(state => state['library'].playlists)

    const submit = event => {
        if (event.key === 'Enter') {
            const isValidName = modalText.trim()

            if (isValidName) {
                dispatch(addPlaylist({
                    id: playlists.length,
                    name: modalText,
                    songs: []
                }))
            }
            updateModalText(() =>'')
        }
    }

    return (
        <label className='create-playlist-modal modal-content hard-rounded-corners'>
            Enter a playlist name:
            <input
                id='create-playlist-input'
                type='text'
                onChange={event => updateModalText(() => event.target.value)}
                value={modalText}
                onKeyPress={submit}
            />
        </label>
    )
}

export default CreatePlaylistModal