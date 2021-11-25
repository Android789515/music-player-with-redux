import React from 'react'

import { directories } from '../DirectoryList'
import SongDirectoryEntry from '../SongDirectoryEntry'
import PlaylistDirectoryEntry from '../PlaylistDirectoryEntry'

interface OpenedPlaylistEntries {
    songs: []
}
interface Props {
    directoryIdentifier: string,
    entries: [] | OpenedPlaylistEntries,
    setCurrentDirectory: (newDirectory: string) => string,
    dispatch: () => void
}

const DirectoryEntries = ({ directoryIdentifier, entries, ...props }: Props) => {

    interface Song {
        id: number
    }
    switch (directoryIdentifier) {
        case directories.songs.identifier:
            return (entries as []).map((song: Song) => (
                <SongDirectoryEntry
                    key={song.id}
                    currentDirectory={directoryIdentifier}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))
        case directories.playlists.identifier:
            interface Playlist {
                id: number
            }
            return (entries as []).map((playlist: Playlist) => (
                <PlaylistDirectoryEntry
                    key={playlist.id}
                    currentDirectory={directoryIdentifier}
                    playlist={playlist}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            ))
        case directories.openedPlaylist.identifier:
            return (entries as OpenedPlaylistEntries).songs.map((song: Song) => (
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