import { createSlice } from '@reduxjs/toolkit'
import { Library } from '../../types/library'

const libraryState: Library = {
    songs: [],
    queuedSong: {
        id: undefined,
        src: undefined,
        coverArt: undefined,
        title: undefined,
        artist: undefined,
        duration: undefined
    },
    // Playlist is an array containing arrays where
    // first items are an obj of id and values
    // and second are arrays of songs
    playlists: [],
    openedPlaylist: undefined,
    playlistPlaying: undefined
}

export const librarySlice = createSlice({
    name: 'library',
    initialState: libraryState,

    reducers: {
        addSongs: (state, action) => {
            switch (action.payload.to) {
                case 'songs':
                    return {...state, songs: [...state.songs, ...action.payload.songs]}

                case 'openedPlaylist':
                    const updatedPlaylists = [...state.playlists].map(playlist => {
                        if (playlist.id === state.openedPlaylist?.id) {
                            return {
                                ...playlist,
                                songs: [...playlist.songs, ...action.payload.songs]
                            }
                        }
                        return playlist
                    })

                    return {
                        ...state,
                        playlists: updatedPlaylists,
                        openedPlaylist: updatedPlaylists.find(playlist => {
                            if (playlist.id === state.openedPlaylist?.id) {
                                return playlist
                            }
                            return undefined
                        })
                    }

                default:
                    return state
            }
        },
        removeSong: (state, action) => {
            switch (action.payload.from) {
                case 'songs':
                    return {...state, songs: state.songs.filter(song => song.id !== action.payload.songId)}

                case 'openedPlaylist':
                    const updatedPlaylists = [...state.playlists].map(playlist => {
                        if (playlist.id === state.openedPlaylist?.id) {
                            return {
                                ...playlist,
                                songs: playlist.songs.filter(song => song.id !== action.payload.songId)
                            }
                        }
                        return playlist
                    })

                    return {
                        ...state,
                        playlists: updatedPlaylists,
                        openedPlaylist: updatedPlaylists.find(playlist => {
                            if (playlist.id === state.openedPlaylist?.id) {
                                return playlist
                            }
                            return undefined
                        })
                    }

                default:
                    return state
            }
        },

        queueSong: (state, action) => {
            return {...state, queuedSong: {...action.payload}}
        },
        unqueueSong: state => {
            const unqueuedSong = {...state.queuedSong}
            Object.values(unqueuedSong).forEach(() => undefined)

            return {...state, queuedSong: unqueuedSong}
        },

        addPlaylist: (state, action) => {
            return {...state, playlists: [...state.playlists, action.payload]}
        },
        renamePlaylist: (state, action) => {
            const { playlistId, newName } = action.payload

            const updatedPlaylists = state.playlists.map(playlist => {
                if (playlist.id === playlistId) {
                    return { ...playlist, name: newName }
                }

                return playlist
            })

            return {...state, playlists: updatedPlaylists}
        },
        removePlaylist: (state, action) => {
            const updatedPlaylists = state.playlists.filter(playlist => playlist.id !== action.payload)

            return {...state, playlists: updatedPlaylists}
        },

        setOpenedPlaylist: (state, action) => {
            return {...state, openedPlaylist: action.payload}
        },

        setPlaylistPlaying: (state, action) => {
            return {...state, playlistPlaying: action.payload}
        }
    }
})

export const {
    addSongs,
    removeSong,
    queueSong,
    unqueueSong,
    addPlaylist,
    renamePlaylist,
    removePlaylist,
    setOpenedPlaylist,
    setPlaylistPlaying
} = librarySlice.actions

export default librarySlice.reducer