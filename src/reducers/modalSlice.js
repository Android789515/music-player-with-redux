import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalContent: undefined,
        modalData: undefined
    },
    reducers: {
        setModalContent: (state, action) => {
            return {...state, modalContent: action.payload}
        },
        clearModal: state => ({ ...state, modalContent: undefined }),
        setModalData: (state, action) => {
            return {...state, modalData: action.payload}
        }
    }
})

export const { setModalContent, clearModal, setModalData } = modalSlice.actions

export default modalSlice.reducer