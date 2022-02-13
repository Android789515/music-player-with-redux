import { Song, Playlist } from './entryTypes'

export interface QueuedSong {
    id: string | undefined
    src: string | undefined
    coverArt: string | undefined
    title: string | undefined
    artist: string | undefined
    duration: number | undefined
}

export interface Library {
    songs: Song[]
    queuedSong: QueuedSong
    playlists: Playlist[]
    openedPlaylist: Playlist | undefined
    playlistPlaying: Playlist | undefined
}