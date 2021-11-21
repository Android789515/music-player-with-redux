import React from 'react'
import { useSelector } from 'react-redux'

import styles from '../../css/modules/library/CurrentDirectory.module.scss'
import { hardRoundedCorners } from '../../css/modules/GenericStyles.module.scss'

import AddEntryBtn from './AddEntryBtn'
import DirectoryEntries from './generic-components/DirectoryEntries'

const CurrentDirectory = ({ identifier: directoryIdentifier, ...props }) => {
    const library = useSelector(state => state['library'])

    const { directory, directoryEntries } = styles
    const whichDirectory = `${directoryIdentifier}Directory`
    return (
        <div className={`${directory} ${whichDirectory} ${hardRoundedCorners}`}>
            {/* Directory entries component are the entries themselves */}
            {/* The style is for the container */}
            <ul className={`unstyledUl ${directoryEntries}`}>
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