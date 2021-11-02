import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        modalContent: undefined,
        // A function that will offer more ways to close the modal,
        // such as pressing enter, or a button that says "ok"
        closeWhen: undefined
    },
    reducers: {
        openModal: state => ({ ...state, isOpen: true }),
        closeModal: state => ({...state, isOpen: false}),
        setModalContent: (state, action) => {
            return {...state, modalContent: action.payload}
        }
    }
})

export const { openModal, closeModal, setModalContent } = modalSlice.actions

export default modalSlice.reducer