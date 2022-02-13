import React from 'react'

import { directories } from '../DirectoryList'
import { Song, Playlist } from '../../../../types/entryTypes'

import SongDirectoryEntry from '../SongDirectoryEntry'
import PlaylistDirectoryEntry from '../PlaylistDirectoryEntry'

interface Props {
    directoryIdentifier: string
    entries: Song[] | Playlist[] | Playlist
    setCurrentDirectory: (newDirectory: string) => string
    dispatch: () => void
}

const DirectoryEntries = ({ directoryIdentifier, entries, ...props }: Props) => {

    switch (directoryIdentifier) {
        case directories.songs.identifier:
            return (entries as Song[]).map((song: Song) => (
                <SongDirectoryEntry
                    key={song.id}
                    currentDirectory={directoryIdentifier}
                    song={song}
                    dispatch={props.dispatch}
                />
            ))
        case directories.playlists.identifier:
            return (entries as Playlist[]).map((playlist: Playlist) => (
                <PlaylistDirectoryEntry
                    key={playlist.id}
                    currentDirectory={directoryIdentifier}
                    playlist={playlist}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                />
            ))
        case directories.openedPlaylist.identifier:
            return (entries as Playlist).songs.map((song: Song) => (
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