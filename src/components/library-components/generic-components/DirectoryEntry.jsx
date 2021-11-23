import React, { useRef, useState } from 'react'

import { directoryEntry } from '../../../css/library/DirectoryEntry.module.scss'

import ContextMenuBtn from './ContextMenuBtn'

const DirectoryEntry = props => {
    const { entry, className, ...restProps } = props

    const directoryEntryRef = useRef(undefined)
    const [ isBtnShown, setIsBtnShown ] = useState(false)

    const showContextMenuBtn = () => setIsBtnShown(true)
    const hideContextMenuBtn = () => setIsBtnShown(false)

    return (
        <li
            key={entry.id}
            entryid={entry.id}
            className={`${className} ${directoryEntry}`}
            ref={directoryEntryRef}
            {...restProps}
            onMouseEnter={showContextMenuBtn}
            onMouseLeave={hideContextMenuBtn}
        >
            {props.children}

            {props.contextoptions &&
                <ContextMenuBtn
                    entry={entry}
                    showBtn={isBtnShown}
                    contextoptions={props.contextoptions}
                />
            }
        </li>
    )
}

export default DirectoryEntry