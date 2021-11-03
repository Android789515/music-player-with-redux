import React from 'react'

import { directories } from '../DirectoryList'
import SongDirectoryEntry from '../SongDirectoryEntry'
import PlaylistDirectoryEntry from '../PlaylistDirectoryEntry'

const DirectoryEntries = ({ directoryIdentifier, entries, ...props }) => {

    switch (directoryIdentifier) {
        case directories.songs:
            return entries.map(song => (
                <SongDirectoryEntry
                    key={song.id}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))
        case directories.playlists:
            return entries.map(playlist => (
                <PlaylistDirectoryEntry
                    key={playlist.id}
                    playlist={playlist}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            ))
        case directories.openedPlaylist:
            return entries.songs.map(song => (
                <SongDirectoryEntry
                    key={song.id}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))

        default:
            return
    }
}

export default DirectoryEntries