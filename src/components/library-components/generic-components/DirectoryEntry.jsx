import React from 'react'
import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, ...neededProps } = props

    return (
        <li key={entry.id} {...neededProps}>
            {props.children}

            <ContextMenuBtn contextOptions={props.contextOptions} />
        </li>
    )
}

export default DirectoryEntry