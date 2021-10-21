import React from 'react'

const DirectoryEntry = props => {
    const { entry, ...neededProps } = props

    return (
        <li key={entry.id} {...neededProps}>
            {props.children}
        </li>
    )
}

export default DirectoryEntry