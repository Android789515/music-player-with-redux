import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import './css/main-styles.scss'
import MediaComponent from './components/media-components/MediaComponent'
import LibraryComponent from './components/library-components/LibraryComponent'

function App() {
    const dispatch = useDispatch()
    const queuedSong = useSelector(state => state['library'].queuedSong)

    return (
        <main className='main-layout'>
            <MediaComponent queuedSong={queuedSong} dispatch={dispatch} />

            <LibraryComponent dispatch={dispatch} />
        </main>
    )
}

export default App