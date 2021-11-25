import React, { MutableRefObject, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import genericStyles from '../../../css/GenericStyles.module.scss'
import styles from '../../../css/library/ContextMenu.module.scss'
import { setModalContent } from '../../../reducers/modalSlice'
import { Song, Playlist } from '../../../utils/entryTypes'
import { capitalize } from '../../../utils/stringManipulation'

import PlaylistModal from '../../modals/PlaylistModal'
import DeleteEntryModal from '../../modals/DeleteEntryModal'

export const contextMenuOptions = {
    _queue: 'queue',
    _open: 'open',
    _rename: 'rename',
    _delete: 'delete'
}

interface Props {
    openContextMenu: (event: React.SyntheticEvent) => void,
    closeContextMenu: (event: React.SyntheticEvent) => void,
    entry: Song | Playlist,
    entryRef: MutableRefObject<HTMLLIElement>,
    shouldShow: boolean,
    position: number,
    contextoptions: string[]
}

const ContextMenu =
    ({ closeContextMenu, entry, entryRef, shouldShow, position, contextoptions }: Props) => {
    const dispatch = useDispatch()

    const handleContextOptionClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        const { target } = event
        const optionClicked = (target as HTMLLIElement).textContent?.toLowerCase()
        const closestEntry = entryRef.current
        closeContextMenu(event)

        switch (optionClicked) {
            case contextMenuOptions._queue:
            case contextMenuOptions._open:
                closestEntry.click()
                break

            case contextMenuOptions._rename:
                if (closestEntry.firstElementChild) {
                    const entryName = closestEntry.firstElementChild.textContent
                    dispatch(setModalContent(<PlaylistModal
                        action='rename'
                        prevName={entryName}
                        playlistId={entry.id}
                    />))
                }
                break

            case contextMenuOptions._delete:
                dispatch(setModalContent(<DeleteEntryModal entry={entry} />))
                break

            default:
                return
        }
    }

    const handleLoseFocus = (event: React.FocusEvent) => {
        const { target: contextMenu, relatedTarget } = event
        if (contextMenu) {
            const isContextOptionFocused =
                (contextMenu as HTMLUListElement).contains(relatedTarget as Node)

            if (!isContextOptionFocused) {
                closeContextMenu(event)
            }
        }
    }

    const { contextMenuOption } = styles
    const contextMenuList = contextoptions.map(option => {
        const uuid = uuidv4()
        return (
            <li
                key={uuid}
                className={contextMenuOption}
                tabIndex={0}
                onClick={handleContextOptionClick}
            >
                {capitalize(option)}
            </li>
        )
    })

    const contextMenuRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (shouldShow && contextMenuRef.current) {
            contextMenuRef.current.focus()
        }
    }, [shouldShow])

    const { contextMenu } = styles
    if (shouldShow) {
        const { hardRoundedCorners } = genericStyles
        return (
            <ul
                className={`${contextMenu} ${hardRoundedCorners}`}
                style={{ left: position }}
                tabIndex={0}
                ref={contextMenuRef}
                onBlur={handleLoseFocus}
            >
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu