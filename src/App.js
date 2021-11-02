import React from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import './css/main-styles.scss'
import MediaPlayer from './components/media-components/MediaPlayer'
import LibraryComponent from './components/library-components/LibraryComponent'
import LibraryBtn from './components/library-components/LibraryBtn'
import Modal from './components/library-components/generic-components/Modal'


function App() {
    const dispatch = useDispatch()

    return (
        <main className='main-layout'>
            <MediaPlayer />

            <LibraryBtn />
            <LibraryComponent dispatch={dispatch} />

            <Modal />
        </main>
    )
}

export default App