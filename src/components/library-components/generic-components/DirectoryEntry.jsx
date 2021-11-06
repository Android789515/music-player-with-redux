import React, { useRef } from 'react'

import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, ...restProps } = props

    const directoryEntryRef = useRef(undefined)

    return (
        <li key={entry.id} entryid={entry.id} {...restProps} ref={directoryEntryRef}>
            {props.children}

            {props.contextoptions && <ContextMenuBtn entry={entry} contextoptions={props.contextoptions} />}
        </li>
    )
}

export default DirectoryEntry