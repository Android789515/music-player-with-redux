import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { hardRoundedCorners } from '../../css/modules/GenericStyles.module.scss'
import { modalContent } from '../../css/modules/modals/Modal.module.scss'
import { playlistModal } from '../../css/modules/modals/PlaylistModal.module.scss'

import { addPlaylist, renamePlaylist } from '../../reducers/librarySlice'
import { clearModal } from '../../reducers/modalSlice'

const PlaylistModal = props => {
    const [ modalText, updateModalText ] = useState(props.prevName || '')

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
        <label className={`${playlistModal} ${modalContent} ${hardRoundedCorners}`}>
            Enter a playlist name:
            <input
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