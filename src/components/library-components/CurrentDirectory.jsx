import React from 'react'

import Directory from './Directory'
import AddEntryBtn from './AddEntryBtn'

const CurrentDirectory = props => {

    return (
        <Directory name={props.name} entries={props.getEntries}>
            <AddEntryBtn
                btnText={props.addEntryText}
                doOnClick={props.handleAddEntryClick}
                hasInputComponent={props.hasInputComponent}
            />
        </Directory>
    )
}

export default CurrentDirectory