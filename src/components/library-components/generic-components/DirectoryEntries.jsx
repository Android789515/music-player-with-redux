import React from 'react'

import SongDirectoryEntry from '../SongDirectoryEntry'
import PlaylistDirectoryEntry from '../PlaylistDirectoryEntry'

const DirectoryEntries = props => {

    switch (props.directoryIdentifier) {
        case 'songs':
            return props.entries.map(song => (
                <SongDirectoryEntry
                    key={song.id}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))
        case 'playlists':
            return props.entries.map(playlist => (
                <PlaylistDirectoryEntry
                    key={playlist.id}
                    playlist={playlist}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            ))
        case 'openedPlaylist':
            return props.entries.songs.map(song => (
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