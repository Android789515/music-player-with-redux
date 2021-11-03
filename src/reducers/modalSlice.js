import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalContent: undefined,
        // A function that will offer more ways to close the modal,
        // such as pressing enter, or a button that says "ok"
    },
    reducers: {
        setModalContent: (state, action) => {
            return {...state, modalContent: action.payload}
        }
    }
})

export const { setModalContent } = modalSlice.actions

export default modalSlice.reducer