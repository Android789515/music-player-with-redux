import React from 'react'
import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, ...neededProps } = props

    const deleteEntry = () => {
        // First open the modal and prompt user if they are sure
        // that they want to delete the entry

        // If no, close the modal and do nothing
        // Else if yes, delete the entry with the method passed down thru
        // props; because this is a generic component which is rendered from
        // more specific directory entry components
    }

    return (
        <li key={entry.id} {...neededProps}>
            {props.children}

            <ContextMenuBtn contextoptions={props.contextoptions} />
        </li>
    )
}

export default DirectoryEntry