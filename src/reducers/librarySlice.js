import { createSlice } from '@reduxjs/toolkit'

export const librarySlice = createSlice({
    name: 'library',
    initialState: {
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
        openedPlaylist: undefined
    },

    reducers: {
        addSong: (state, action) => {
            switch (action.payload.to) {
                case 'songs':
                    return {...state, songs: [...state.songs, action.payload.song]}

                case 'openedPlaylist':
                    const updatedPlaylists = [...state.playlists].map(playlist => {
                        if (playlist.id === state.openedPlaylist.id) {
                            return {
                                ...playlist,
                                songs: [...playlist.songs, action.payload.song]
                            }
                        }
                        return playlist
                    })

                    return {
                        ...state,
                        songs: [...state.songs, action.payload.song],
                        playlists: updatedPlaylists,
                        openedPlaylist: updatedPlaylists.find(playlist => playlist.id === state.openedPlaylist.id)
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
                        if (playlist.id === state.openedPlaylist.id) {
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
                        openedPlaylist: updatedPlaylists.find(playlist => playlist.id === state.openedPlaylist.id)
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
            Object.keys(unqueuedSong).forEach(key => unqueuedSong[key] = undefined)

            return {...state, queuedSong: unqueuedSong}
        },

        addPlaylist: (state, action) => {
            return {...state, playlists: [...state.playlists, action.payload]}
        },

        setOpenedPlaylist: (state, action) => {
            return {...state, openedPlaylist: action.payload}
        }
    }
})

export const {
    addSong,
    removeSong,
    queueSong,
    unqueueSong,
    addPlaylist,
    setOpenedPlaylist
} = librarySlice.actions

export default librarySlice.reducer