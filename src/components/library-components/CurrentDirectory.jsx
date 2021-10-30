import React from 'react'

import '../../css/library-styles/library-directory-styles.scss'

import AddEntryBtn from './AddEntryBtn'

const CurrentDirectory = props => {

    const classFormattedName = props.identifier.split('').reduce((formattedName, char) => {
        return `${formattedName}${/[A-Z]/.test(char) ? '-' + char.toLowerCase() : char}`
    }, '')

    return (
        <div className={`directory ${classFormattedName}-directory hard-rounded-corners`}>
            <ul className='unstyled-ul directory-entries'>
                {props.children}
            </ul>

            <AddEntryBtn
                btnText={props.addEntryText}
                doOnClick={props.handleAddEntryClick}
                uploadTo={props.identifier}
                hasInputComponent={props.hasInputComponent}
            />
        </div>
    )
}

export default CurrentDirectory