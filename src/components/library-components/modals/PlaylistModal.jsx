import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import '../../../css/modal-styles.scss'

import { addPlaylist, renamePlaylist } from '../../../reducers/librarySlice'
import { clearModal } from '../../../reducers/modalSlice'

const PlaylistModal = props => {
    const [ modalText, updateModalText ] = useState(props.initialText || '')

    const actions = {
        create: 'create',
        rename: 'rename'
    }

    const dispatch = useDispatch()
    const submit = () => {
        const isValidName = modalText.trim()

        if (isValidName && props.action === actions.create) {
            const playlistId = uuidv4()
            dispatch(addPlaylist({
                id: playlistId,
                name: modalText,
                songs: []
            }))
        } else {
            dispatch(renamePlaylist({
                playlistId: props.playlistId,
                newName: modalText
            }))
        }
        updateModalText('')

        dispatch(clearModal())
    }

    const inputRef = useRef(undefined)
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <label className='create-playlist-modal modal-content hard-rounded-corners'>
            Enter a playlist name:
            <input
                id='create-playlist-input'
                type='text'
                onChange={event => updateModalText(() => event.target.value)}
                value={modalText}
                onKeyPress={({ key }) => key === 'Enter' && submit()}
                ref={inputRef}
            />
        </label>
    )
}

export default PlaylistModal