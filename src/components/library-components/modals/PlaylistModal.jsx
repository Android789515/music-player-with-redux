import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../../css/modal-styles.scss'

import { addPlaylist } from '../../../reducers/librarySlice'
import { clearModal } from '../../../reducers/modalSlice'

const PlaylistModal = props => {
    const [ modalText, updateModalText ] = useState('')

    const dispatch = useDispatch()
    const playlists = useSelector(state => state['library'].playlists)

    const actions = {
        create: 'create',
        rename: 'rename'
    }

    const submit = () => {
        const isValidName = modalText.trim()

        if (isValidName) {
            if (props.action === actions.create) {
                dispatch(addPlaylist({
                    id: playlists.length,
                    name: modalText,
                    songs: []
                }))
            } else {
                // dispatch()
            }
        }
        updateModalText('')

        dispatch(clearModal())
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

export default PlaylistModal