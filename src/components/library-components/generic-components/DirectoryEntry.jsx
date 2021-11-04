import React, { useEffect, useRef } from 'react'
import { customEvents } from '../../../events'

import { setModalContent } from '../../../reducers/modalSlice'
import ContextMenuBtn from './ContextMenuBtn'
import DeleteEntryModal from '../modals/DeleteEntryModal'

const DirectoryEntry = props => {
    const { entry, ...restProps } = props

    const directoryEntryRef = useRef(undefined)

    const renderDeleteEntryModal = () => {
        props.dispatch(setModalContent(<DeleteEntryModal entry={props.song} />))
    }

    useEffect(() => {
        const directoryEntry = directoryEntryRef.current
        directoryEntry.addEventListener(customEvents.deleteRequest, renderDeleteEntryModal)

        return () => directoryEntry.removeEventListener(customEvents.deleteRequest, renderDeleteEntryModal)
    }, [])

    return (
        <li key={entry.id} entryid={entry.id} {...restProps} ref={directoryEntryRef}>
            {props.children}

            <ContextMenuBtn contextoptions={props.contextoptions} />
        </li>
    )
}

export default DirectoryEntry