import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { hardRoundedCorners, overlayComponent } from '../../css/GenericStyles.module.scss'
import { modalContent } from '../../css/modals/Modal.module.scss'
import styles from '../../css/modals/AddToPlaylistModal.module.scss'

import { addSongs } from '../../reducers/librarySlice'
import { clearModal } from '../../reducers/modalSlice'
import { directories } from '../library-components/DirectoryList'

import AddableSongEntry from '../library-components/AddableSongEntry'
import ModalBtn from '../library-components/generic-components/ModalBtn'

const AddToPlaylistModal = () => {
    const [ songsToAdd, updateSongsToAdd ] = useState([])

    const songs = useSelector(state => state.library.songs)

    const songEntries = songs.map(song => {
        const isSongMarked = songsToAdd.some(songsAdding => songsAdding.id === song.id)
        return (
            <AddableSongEntry
                key={uuid()}
                isMarked={isSongMarked}
                updateSongsToAdd={updateSongsToAdd}
                song={song}
            />
        )
    })

    const dispatch = useDispatch()
    const addSongsToPlaylist = () => {
        const openedPlaylist = directories.openedPlaylist.identifier
        dispatch(addSongs({ to: openedPlaylist, songs: songsToAdd }))

        dispatch(clearModal())
    }

    const cancel = () => dispatch(clearModal())

    const areNoSongsInLibrary = songsToAdd.length < 1
    const { songsInLibrary, fallbackText, modalBtns } = styles
    return (
        <div className={`${modalContent} ${overlayComponent} ${hardRoundedCorners}`}>
            <ul className={`unstyledUl ${songsInLibrary}`}>
                {
                    songs.length > 0 ? songEntries :
                    <li className={`${fallbackText}`}>Add songs to your library first.</li>
                }
            </ul>

            <div className={modalBtns}>
                <ModalBtn doOnClick={cancel} btnText='Cancel' />

                <ModalBtn
                    btnText='Add songs'
                    disabled={areNoSongsInLibrary}
                    doOnClick={addSongsToPlaylist}
                />
            </div>
        </div>
    )
}

export default AddToPlaylistModal