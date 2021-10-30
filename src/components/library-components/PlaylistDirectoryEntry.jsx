import React from 'react'

import { directories } from './DirectoryList'
import { setOpenedPlaylist } from '../../reducers/librarySlice'
import renamePlaylistBtn from '../../img/dark-btns/rename.svg'

import DirectoryEntry from './DirectoryEntry'

const PlaylistDirectoryEntry = props => {
    const cutPlaylistName = () => {
        const maxCharLenAsEntry = 20
        const name = props.playlist.name
        const isNameTooLong = name.length > maxCharLenAsEntry

        if (isNameTooLong) {
            const cutName = name.split('').reduce((result, char, index) => {
                const shouldKeepLetter = index <= 20
                return result + (shouldKeepLetter ? char : '')
            }, '')

            return cutName + '...'
        } else {
            return name
        }
    }

    return (
        <DirectoryEntry
            entry={props.playlist}
            className='btn directory-entry'
            onClick={() => {
                // Show songs in the playlist
                props.dispatch(setOpenedPlaylist(props.playlist))

                props.setCurrentDirectory(() => directories.openedPlaylist)
            }}
        >
            <h4 className='playlist-entry-title'>{cutPlaylistName()}</h4>
            <p className='playlist-entry-song-count'>{props.playlist.songs.length} songs</p>
            <img className='rename-playlist-btn overlay-component' src={renamePlaylistBtn} alt='Rename playlist button' />
        </DirectoryEntry>
    )
}

export default PlaylistDirectoryEntry