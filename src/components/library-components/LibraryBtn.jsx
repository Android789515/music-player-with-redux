import React, { useState } from 'react'

const showOrHideLibrary = setLibraryOpen => {
    setLibraryOpen(prevOpenState => {
        const newOpenState = !prevOpenState
        const willLibraryBeOpen = newOpenState === true

        const libraryComponent = document.querySelector('.library')
        if (willLibraryBeOpen) {
            libraryComponent.classList.add('library-open')
        } else {
            libraryComponent.classList.remove('library-open')
        }

        return newOpenState
    })
}

const LibraryBtn = () => {
    const [ isLibraryOpen, setIsLibraryOpen ] = useState(false)

    return (
        <button
            className={`btn ${isLibraryOpen ? 'close' : 'open'}-library-btn library-panel-btn`}
            onClick={() => showOrHideLibrary(setIsLibraryOpen)}>
            {isLibraryOpen ? '⛌' : '☰'}
        </button>
    )
}

export default LibraryBtn