import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addSong } from '../../../reducers/librarySlice'
import { clearModal } from '../../../reducers/modalSlice'
import { directories } from '../DirectoryList'

import AddableSongEntry from '../AddableSongEntry'
import ModalBtn from '../generic-components/ModalBtn'
import Tooltip from '../generic-components/Tooltip'

const AddToPlaylistModal = props => {
    const [ songsToAdd, updateSongsToAdd ] = useState([])

    const songs = useSelector(state => state['library'].songs)

    const songEntries = songs.map(song => {
        return <AddableSongEntry updateSongsToAdd={updateSongsToAdd} song={song} />
    })

    const dispatch = useDispatch()
    const addSongs = () => {
        songsToAdd.forEach(song => {
            const openedPlaylist = directories.openedPlaylist.identifier
            dispatch(addSong({ to: openedPlaylist, song: song }))
        })

        dispatch(clearModal())
    }

    const cancel = () => dispatch(clearModal())

    // const [ shouldShowTooltip, setShouldShowTooltip ] = useState(false)

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
                disabled={songsToAdd.length < 1}
                doOnClick={addSongs}
                // onMouseEnter={() => setShouldShowTooltip(true)}
                // onMouseLeave={() => setShouldShowTooltip(false)}
            />

            {/*{shouldShowTooltip && <Tooltip text='Select songs to add to the playlist' />}*/}
        </div>
    )
}

export default AddToPlaylistModal