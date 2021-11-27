export interface Song {
    id: number
    src: string
    coverArt: string
    title: string
    artist: string
    duration: number
}

export interface Playlist {
    id: number
    name: string
    songs: []
}