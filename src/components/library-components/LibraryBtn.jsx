import React from 'react'

import styles from '../../css/library/LibraryBtn.module.scss'
import libraryBtn from '../../img/dark-btns/library.svg'
import closeBtn from '../../img/dark-btns/close.svg'

const LibraryBtn = ({ libraryToggle }) => {
    const [ isLibraryShown, setIsLibraryShown ] = libraryToggle

    const toggleLibraryShown = () => setIsLibraryShown(prevOpenState => !prevOpenState)

    const { libraryPanelBtn } = styles
    const libraryBtnType = styles[`${isLibraryShown ? 'close' : 'open'}LibraryBtn`]
    return (
        <img
            className={`btn ${libraryBtnType} ${libraryPanelBtn}`}
            src={isLibraryShown ? closeBtn : libraryBtn}
            alt={isLibraryShown ? 'Close library button' : 'Open library button'}
            onClick={toggleLibraryShown}
        />
    )
}

export default LibraryBtn