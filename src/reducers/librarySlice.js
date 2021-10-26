import { createSlice } from '@reduxjs/toolkit'

export const librarySlice = createSlice({
    name: 'library',
    initialState: {
        songs: [],
        // Playlist is an array containing arrays where
        // first items are an obj of id and values
        // and second are arrays of songs
        playlists: [],
        openedPlaylist: undefined,
        queuedSong: {
            id: undefined,
            src: undefined,
            title: undefined,
            artist: undefined,
            duration: undefined
        }
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
                    return {...state, songs: state.songs.filter(song => song.id !== action.payload.song.id)}

                case 'playlist':
                    const playlistId = action.payload.id

                    const updatedPlaylists = state.playlists.filter(playlist => {
                        const playlistInfo = playlist[0]

                        return playlistInfo.id !== playlistId
                    })

                    return {...state, playlists: updatedPlaylists}

                default:
                    return state
            }
        },

        queueSong: (state, action) => {
            return {...state, queuedSong: {...action.payload}}
        },

        addPlaylist: (state, action) => {
            return {...state, playlists: [...state.playlists, action.payload]}
        },

        setOpenedPlaylist: (state, action) => {
            return {...state, openedPlaylist: action.payload}
        }
    }
})

export const { addSong, removeSong, queueSong, addPlaylist, setOpenedPlaylist } = librarySlice.actions

export default librarySlice.reducer

// example playlist array
// playlists: [
//     [{ id: 0, title: 'Classic' },
//         [{
//             id: 0,
//             src: TakeOnMe,
//             title: 'Take on Me',
//             artist: 'Aha',
//             duration: 227
//         }]
//     ],
//     [{ id: 1, title: 'Rock' },
//         [{
//             id: 0,
//             src: SummerOf69,
//             title: `Summer of '69`,
//             artist: 'Bryan Adams',
//             duration: undefined
//         }]
//     ]
// ]