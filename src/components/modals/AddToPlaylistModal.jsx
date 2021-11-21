import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hardRoundedCorners, overlayComponent } from '../../css/modules/GenericStyles.module.scss'
import { modalContent } from '../../css/modules/modals/Modal.module.scss'
import styles from '../../css/modules/modals/AddToPlaylistModal.module.scss'

import { addSongs } from '../../reducers/librarySlice'
import { clearModal } from '../../reducers/modalSlice'
import { directories } from '../library-components/DirectoryList'

import AddableSongEntry from '../library-components/AddableSongEntry'
import ModalBtn from '../library-components/generic-components/ModalBtn'

const AddToPlaylistModal = () => {
    const [ songsToAdd, updateSongsToAdd ] = useState([])

    const songs = useSelector(state => state.library.songs)

    const songEntries = songs.map(song => {
        return <AddableSongEntry updateSongsToAdd={updateSongsToAdd} song={song} />
    })

    const dispatch = useDispatch()
    const addSongsToPlaylist = () => {
        const openedPlaylist = directories.openedPlaylist.identifier
        dispatch(addSongs({ to: openedPlaylist, songs: songsToAdd }))

        dispatch(clearModal())
    }

    const cancel = () => dispatch(clearModal())

    const areNoSongsInLibrary = songsToAdd.length < 1
    const { addToPlaylistModal, songsInLibrary, fallbackText } = styles
    return (
        <div className={`${addToPlaylistModal} ${modalContent} ${overlayComponent} ${hardRoundedCorners}`}>
            <ul className={`unstyledUl ${songsInLibrary}`}>
                {
                    songs.length > 0 ? songEntries :
                    <li className={`${fallbackText}`}>Add songs to your library first.</li>
                }
            </ul>

            <ModalBtn doOnClick={cancel} btnText='Cancel' />

            <ModalBtn
                btnText='Add songs'
                disabled={areNoSongsInLibrary}
                doOnClick={addSongsToPlaylist}
            />
        </div>
    )
}

export default AddToPlaylistModal