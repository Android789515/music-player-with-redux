import React from 'react'

import { directories } from '../DirectoryList'
import SongDirectoryEntry from '../SongDirectoryEntry'
import PlaylistDirectoryEntry from '../PlaylistDirectoryEntry'

const DirectoryEntries = ({ directoryIdentifier, entries, ...props }) => {

    switch (directoryIdentifier) {
        case directories.songs.identifier:
            return entries.map(song => (
                <SongDirectoryEntry
                    key={song.id}
                    currentDirectory={directoryIdentifier}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))
        case directories.playlists.identifier:
            return entries.map(playlist => (
                <PlaylistDirectoryEntry
                    key={playlist.id}
                    currentDirectory={directoryIdentifier}
                    playlist={playlist}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            ))
        case directories.openedPlaylist.identifier:
            return entries.songs.map(song => (
                <SongDirectoryEntry
                    key={song.id}
                    currentDirectory={directoryIdentifier}
                    isInPlaylist={true}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))

        default:
            return <></>
    }
}

export default DirectoryEntries