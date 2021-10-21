import { configureStore } from '@reduxjs/toolkit'

import libraryReducer from './reducers/librarySlice'
import mediaReducer from './reducers/mediaSlice'

export default configureStore({
    reducer: {
        library: libraryReducer,
        media: mediaReducer
    }
})