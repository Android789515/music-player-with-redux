import React from 'react'

import './css/modules/globals.scss'
import { mainLayout } from './css/modules/App.module.scss'

import MediaPlayer from './components/media-components/MediaPlayer'
import Library from './components/library-components/Library'
import LibraryBtn from './components/library-components/LibraryBtn'
import Modal from './components/modals/Modal'


function App() {
    return (
        <main className={mainLayout}>
            <MediaPlayer />

            <LibraryBtn />
            <Library />

            <Modal />
        </main>
    )
}

export default App