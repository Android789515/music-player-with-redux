import React, { useState } from 'react'

import '../../../css/modal-styles.scss'
import store from '../../../store'
import { addPlaylist } from '../../../reducers/librarySlice'

import Modal from '../generic-components/Modal'

const CreatePlaylistModal = props => {
    const [ modalText, updateModalText ] = useState('')

    const submit = event => {
        const playlists = store.getState().library.playlists

        if (event.key === 'Enter') {
            const isValidName = modalText.trim()

            if (isValidName) {
                props.dispatch(addPlaylist({
                    id: playlists.length,
                    name: modalText,
                    songs: []
                }))
            }
            updateModalText(() =>'')
        }
    }

    const closeWhen = event => event.key === 'Enter'

    return (
        <Modal closeWhen={closeWhen}>
            <label className='create-playlist-prompt hard-rounded-corners'>
                Enter a playlist name:
                <input
                    id='create-playlist-input'
                    type='text'
                    onChange={event => updateModalText(() => event.target.value)}
                    value={modalText}
                    onKeyPress={submit}
                />
            </label>
        </Modal>
    )
}

export default CreatePlaylistModal