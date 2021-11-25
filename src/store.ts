import { configureStore } from '@reduxjs/toolkit'

import libraryReducer from './reducers/librarySlice'
import mediaReducer from './reducers/mediaSlice'
import modalReducer from './reducers/modalSlice'

export default configureStore({
    reducer: {
        library: libraryReducer,
        media: mediaReducer,
        modal: modalReducer
    }
})