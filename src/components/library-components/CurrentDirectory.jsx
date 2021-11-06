import React from 'react'
import { useSelector } from 'react-redux'

import '../../css/library-styles/library-directory-styles.scss'

import AddEntryBtn from './AddEntryBtn'
import DirectoryEntries from './generic-components/DirectoryEntries'

const CurrentDirectory = ({ identifier: directoryIdentifier, ...props }) => {
    const library = useSelector(state => state['library'])

    // Converts the camel casing to hyphenated convention
    const classFormattedName = directoryIdentifier.split('')
        .reduce((formattedName, char) => {
            const isLetterUppercase = /[A-Z]/.test(char)

            if (isLetterUppercase) {
                return `${formattedName}-${char.toLowerCase()}`
            }
            return formattedName + char
    }, '')

    return (
        <div className={`directory ${classFormattedName}-directory hard-rounded-corners`}>
            <ul className='unstyled-ul directory-entries'>
                <DirectoryEntries
                    entries={library[directoryIdentifier]}
                    directoryIdentifier={directoryIdentifier}
                    setCurrentDirectory={props.setCurrentDirectory}
                    dispatch={props.dispatch}
                 />
            </ul>

            <AddEntryBtn
                btnText={props.addEntryText}
                isPlaylistOpen={library.openedPlaylist}
                hasInputComponent={props.hasInputComponent}
                dispatch={props.dispatch}
            />
        </div>
    )
}

export default CurrentDirectory