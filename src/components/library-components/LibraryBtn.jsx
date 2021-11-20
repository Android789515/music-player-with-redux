import React, { useState } from 'react'

import styles from '../../css/modules/library/LibraryBtn.module.scss'
import libraryBtn from '../../img/dark-btns/library.svg'
import closeBtn from '../../img/dark-btns/close.svg'

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
    const [ isLibraryOpen, setIsLibraryOpen ] = useState(true)

    const { libraryPanelBtn } = styles
    const libraryBtnType = styles[`${isLibraryOpen ? 'close' : 'open'}LibraryBtn`]
    return (
        <img
            className={`btn ${libraryBtnType} ${libraryPanelBtn}`}
            onClick={() => showOrHideLibrary(setIsLibraryOpen)}
            src={isLibraryOpen ? closeBtn : libraryBtn}
            alt={isLibraryOpen ? 'Close library button' : 'Open library button'}
        />
    )
}

export default LibraryBtn