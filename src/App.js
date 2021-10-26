import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import './css/main-styles.scss'
import MediaPlayer from './components/media-components/MediaPlayer'
import LibraryComponent from './components/library-components/LibraryComponent'
import LibraryBtn from './components/library-components/LibraryBtn'
import CreatePlaylistModal from './components/library-components/CreatePlaylistModal'

function App() {
    const dispatch = useDispatch()

    return (
        <main className='main-layout'>
            <MediaPlayer />

            <LibraryBtn />
            <LibraryComponent dispatch={dispatch} />

            <CreatePlaylistModal dispatch={dispatch} />
        </main>
    )
}

export default App