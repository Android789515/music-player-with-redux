import React from 'react'

import './css/modules/globals.scss'
import { mainLayout } from './css/modules/App.module.scss'

import MediaPlayer from './components/media-components/MediaPlayer'
import LibraryComponent from './components/library-components/LibraryComponent'
import LibraryBtn from './components/library-components/LibraryBtn'
import Modal from './components/modals/Modal'


function App() {
    return (
        <main className={mainLayout}>
            <MediaPlayer />

            <LibraryBtn />
            <LibraryComponent />

            <Modal />
        </main>
    )
}

export default App