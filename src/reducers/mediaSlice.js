import { createSlice } from '@reduxjs/toolkit'
export const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        workingDirectory: { id: undefined, name: undefined },
        volume: .5,
        muted: false,
        paused: true,
        loop: false,
        shuffle: false,
        time: 0,
        maxTime: undefined
    },

    reducers: {
        setWorkingDirectory: (state, action) => {
            return {...state, workingDirectory: action.payload}
        },

        stop: state => {
            return {...state, paused: true, time: 0}
        },
        pause: state => {
            return {...state, paused: true}
        },
        play: state => {
            return {...state, paused: false, time: state.time === state.maxTime ? 0 : state.time}
        },

        toggleLoop: state => {
            return {...state, loop: !state.loop}
        },
        toggleShuffle: state => {
            return {...state, shuffle: !state.shuffle}
        },
        toggleMute: state => {
            return {...state, muted: !state.muted}
        },
        setVolume: (state, action) => {
            return {...state, volume: action.payload}
        },
        updateTime: (state, action) => {
            if (action.payload < 0) {
                action.payload = 0
            } else if (action.payload > state.maxTime) {
                action.payload = state.maxTime
            }
            return {...state, time: action.payload}
        },
        setMaxTime: (state, action) => {
            return {...state, maxTime: action.payload}
        }
    }
})

export const {
    stop,
    pause,
    play,
    setVolume,
    toggleLoop,
    toggleShuffle,
    toggleMute,
    updateTime,
    setMaxTime
} = mediaSlice.actions

export default mediaSlice.reducer