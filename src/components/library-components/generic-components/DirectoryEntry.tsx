import React, { MutableRefObject, useRef, useState } from 'react'

// @ts-ignore
import { directoryEntry } from '../../../css/library/DirectoryEntry.module.scss'

import { Song, Playlist } from '../../../../types/entryTypes'

import ContextMenuBtn from './ContextMenuBtn'

interface Props {
    entry: Song | Playlist
    className: string
    contextoptions: string[]
}

const DirectoryEntry: React.FC<Props> = ({ entry, className, ...props }) => {
    const directoryEntryRef = useRef<HTMLLIElement>(null) as MutableRefObject<HTMLLIElement>
    const [ isBtnShown, setIsBtnShown ] = useState(false)

    const showContextMenuBtn = () => setIsBtnShown(true)
    const hideContextMenuBtn = () => setIsBtnShown(false)

    const entryHasContextOptions = props.contextoptions.length > 0

    return (
        <li
            key={entry.id}
            className={`${className} ${directoryEntry}`}
            ref={directoryEntryRef}
            {...props}
            onMouseEnter={showContextMenuBtn}
            onMouseLeave={hideContextMenuBtn}
        >
            {props.children}

            {entryHasContextOptions &&
                <ContextMenuBtn
                    entry={entry}
                    entryRef={directoryEntryRef}
                    showBtn={isBtnShown}
                    contextoptions={props.contextoptions}
                />
            }
        </li>
    )
}

export default DirectoryEntry