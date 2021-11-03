import React, { useEffect, useRef } from 'react'
import { customEvents } from '../../../events'

import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, deleteEntry, ...restProps } = props

    const directoryEntryRef = useRef(undefined)

    useEffect(() => {
        const directoryEntry = directoryEntryRef.current
        directoryEntry.addEventListener(customEvents.deleteRequest, deleteEntry)

        return () => directoryEntry.removeEventListener(customEvents.deleteRequest, deleteEntry)
    }, [])

    return (
        <li key={entry.id} entryid={entry.id} {...restProps} ref={directoryEntryRef}>
            {props.children}

            <ContextMenuBtn contextoptions={props.contextoptions} />
        </li>
    )
}

export default DirectoryEntry