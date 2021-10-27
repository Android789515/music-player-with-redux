import React, { useEffect, useState } from 'react'

import store from '../../store'
import { addPlaylist } from '../../reducers/librarySlice'

const CreatePlaylistModal = props => {
    const [ modalText, updateModalText ] = useState('')

    const hideModal = () => {
        const thisComponent = document.querySelector('.create-playlist-modal')
        thisComponent.classList.add('hidden')

        updateModalText(() =>'')
    }
    const closeModalWhenEscPressed = event => {
        if (event.key === 'Escape') {
            hideModal()
        }
    }

    const submit = event => {
        const playlists = store.getState().library.playlists

        if (event.key === 'Enter') {
            props.dispatch(addPlaylist({
                id: playlists.length,
                name: modalText,
                songs: []
            }))
            hideModal()
        }
        closeModalWhenEscPressed(event)
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeModalWhenEscPressed)

        return () => {
            document.body.removeEventListener('keydown', closeModalWhenEscPressed)
        }
    }, [])

    return (
        <div className='create-playlist-modal hidden'>
            <label className='create-playlist-prompt'>
                Enter a playlist name:
                <input
                    id='create-playlist-input'
                    type='text'
                    onChange={event => updateModalText(() => event.target.value)}
                    value={modalText}
                    onKeyPress={submit}
                />
            </label>
        </div>
    )
}

export default CreatePlaylistModal