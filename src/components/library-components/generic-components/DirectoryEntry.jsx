import React, { useEffect, useRef } from 'react'
import { customEvents } from '../../../events'

import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, handleDelete, ...restProps } = props

    const directoryEntryRef = useRef(undefined)

    useEffect(() => {
        const directoryEntry = directoryEntryRef.current
        directoryEntry.addEventListener(customEvents.deleteRequest, handleDelete)

        return () => directoryEntry.removeEventListener(customEvents.deleteRequest, handleDelete)
    }, [])

    return (
        <li key={entry.id} entryid={entry.id} {...restProps} ref={directoryEntryRef}>
            {props.children}

            <ContextMenuBtn contextoptions={props.contextoptions} />
        </li>
    )
}

export default DirectoryEntry