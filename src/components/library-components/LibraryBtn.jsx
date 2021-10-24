import React, { useState } from 'react'

const LibraryBtn = () => {
    const [libraryOpen, setLibraryOpen] = useState(false)

    return (
        <button
            className={`btn ${libraryOpen ? 'close' : 'open'}-library-btn library-panel-btn`}
            onClick={() => toggleShowLibrary(setLibraryOpen)}>
            {libraryOpen ? '⛌' : '☰'}
        </button>
    )
}

function toggleShowLibrary(setLibraryOpen) {
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

export default LibraryBtn