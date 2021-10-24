import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import './css/main-styles.scss'
import MediaComponent from './components/media-components/MediaComponent'
import LibraryComponent from './components/library-components/LibraryComponent'
import LibraryBtn from './components/library-components/LibraryBtn'
import CreatePlaylistModal from './components/library-components/CreatePlaylistModal'

function App() {
    const dispatch = useDispatch()
    const queuedSong = useSelector(state => state['library'].queuedSong)

    return (
        <main className='main-layout'>
            <MediaComponent queuedSong={queuedSong} dispatch={dispatch} />

            <LibraryBtn />
            <LibraryComponent dispatch={dispatch} />

            <CreatePlaylistModal dispatch={dispatch} />
        </main>
    )
}

export default App