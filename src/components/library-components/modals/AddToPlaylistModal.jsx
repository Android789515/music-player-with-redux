import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addSongs } from '../../../reducers/librarySlice'
import { clearModal } from '../../../reducers/modalSlice'
import { directories } from '../DirectoryList'

import AddableSongEntry from '../AddableSongEntry'
import ModalBtn from '../generic-components/ModalBtn'

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
    return (
        <div className='add-to-playlist-modal modal-content overlay-component hard-rounded-corners'>
            <ul className='unstyled-ul songs-in-library'>
                {
                    songs.length > 0 ? songEntries :
                    <li className='fallback-text'>Add songs to your library first.</li>
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