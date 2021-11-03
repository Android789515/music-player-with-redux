import React from 'react'

import './App.css'
import './css/main-styles.scss'
import MediaPlayer from './components/media-components/MediaPlayer'
import LibraryComponent from './components/library-components/LibraryComponent'
import LibraryBtn from './components/library-components/LibraryBtn'
import Modal from './components/library-components/generic-components/Modal'


function App() {
    return (
        <main className='main-layout'>
            <MediaPlayer />

            <LibraryBtn />
            <LibraryComponent />

            <Modal />
        </main>
    )
}

export default App