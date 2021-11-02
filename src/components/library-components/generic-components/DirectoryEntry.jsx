import React, { useEffect, useRef } from 'react'
import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, deleteEntry, ...neededProps } = props

    const directoryEntryRef = useRef(undefined)

    useEffect(() => {
        const directoryEntry = directoryEntryRef.current
        directoryEntry.addEventListener('deleterequest', deleteEntry)

        return () => directoryEntry.removeEventListener('deleterequest', deleteEntry)
    }, [])

    return (
        <li key={entry.id} entryid={entry.id} {...neededProps} ref={directoryEntryRef}>
            {props.children}

            <ContextMenuBtn contextoptions={props.contextoptions} />
        </li>
    )
}

export default DirectoryEntry