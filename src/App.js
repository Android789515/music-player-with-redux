import React, { useRef, useState } from 'react'

import './css/modules/globals.scss'
import { mainLayout } from './css/modules/App.module.scss'

import MediaPlayer from './components/media-components/MediaPlayer'
import Library from './components/library-components/Library'
import LibraryBtn from './components/library-components/LibraryBtn'
import Modal from './components/modals/Modal'


function App() {
    const libraryToggle = useState(true)
    const [ isLibraryShown ] = libraryToggle

    return (
        <main className={mainLayout}>
            <MediaPlayer />

            <LibraryBtn libraryToggle={libraryToggle} />
            <Library isLibraryShown={isLibraryShown} />

            <Modal />
        </main>
    )
}

export default App