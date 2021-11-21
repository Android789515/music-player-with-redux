import React, { useRef } from 'react'

import { directoryEntry } from '../../../css/modules/library/DirectoryEntry.module.scss'

import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, className, ...restProps } = props

    const directoryEntryRef = useRef(undefined)

    return (
        <li
            key={entry.id}
            entryid={entry.id}
            className={`${className} ${directoryEntry}`}
            ref={directoryEntryRef}
            {...restProps}
        >
            {props.children}

            {props.contextoptions && <ContextMenuBtn entry={entry} contextoptions={props.contextoptions} />}
        </li>
    )
}

export default DirectoryEntry