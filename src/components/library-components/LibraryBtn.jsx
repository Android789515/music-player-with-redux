import React, { useState } from 'react'

import styles from '../../css/modules/library/LibraryBtn.module.scss'
import libraryBtn from '../../img/dark-btns/library.svg'
import closeBtn from '../../img/dark-btns/close.svg'

const LibraryBtn = ({ libraryToggle }) => {
    const [ isLibraryOpen, setIsLibraryOpen ] = libraryToggle

    const toggleLibraryShown = () => setIsLibraryOpen(prevOpenState => !prevOpenState)

    const { libraryPanelBtn } = styles
    const libraryBtnType = styles[`${isLibraryOpen ? 'close' : 'open'}LibraryBtn`]
    return (
        <img
            className={`btn ${libraryBtnType} ${libraryPanelBtn}`}
            src={isLibraryOpen ? closeBtn : libraryBtn}
            alt={isLibraryOpen ? 'Close library button' : 'Open library button'}
            onClick={toggleLibraryShown}
        />
    )
}

export default LibraryBtn