import { createSlice } from '@reduxjs/toolkit'
export const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        volume: .5,
        muted: false,
        paused: true,
        time: 0,
        maxTime: undefined
    },

    reducers: {
        stop: state => {
            return {...state, paused: true, time: 0}
        },
        pause: state => {
            return {...state, paused: true}
        },
        play: state => {
            return {...state, paused: false}
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

export const { stop, pause, play, setVolume, toggleMute, updateTime, setMaxTime } = mediaSlice.actions

export default mediaSlice.reducer