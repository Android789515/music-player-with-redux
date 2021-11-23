import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { hardRoundedCorners } from '../../../css/modules/GenericStyles.module.scss'
import styles from '../../../css/modules/library/ContextMenu.module.scss'
import { setModalContent } from '../../../reducers/modalSlice'

import PlaylistModal from '../../modals/PlaylistModal'
import DeleteEntryModal from '../../modals/DeleteEntryModal'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export const contextMenuOptions = {
    _queue: 'queue',
    _open: 'open',
    _rename: 'rename',
    _delete: 'delete'
}

const ContextMenu = props => {
    const dispatch = useDispatch()

    const handleContextOptionClick = event => {
        event.stopPropagation()

        const { target } = event
        const optionClicked = target.textContent.toLowerCase()
        const closestEntry = target.closest('.directory-entry')
        props.closeContextMenu(event)

        switch (optionClicked) {
            case contextMenuOptions._queue:
            case contextMenuOptions._open:
                closestEntry.click()
                break

            case contextMenuOptions._rename:
                const entryName = closestEntry.firstElementChild.textContent
                dispatch(setModalContent(<PlaylistModal
                    action='rename'
                    prevName={entryName}
                    playlistId={props.entry.id}
                />))
                break

            case contextMenuOptions._delete:
                dispatch(setModalContent(<DeleteEntryModal entry={props.entry} />))
                break

            default:
                return
        }
    }

    const handleLoseFocus = event => {
        const { target: contextMenu } = event
        const isContextOptionFocused = contextMenu.contains(event.relatedTarget)

        if (!isContextOptionFocused) {
            props.closeContextMenu(event)
        }
    }

    const { contextMenuOption } = styles
    const contextMenuList = props.contextoptions.map(option => {
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

    const contextMenuRef = useRef(undefined)

    useEffect(() => {
        if (props.shouldShow) {
            contextMenuRef.current.focus()
        }
    }, [props.shouldShow])

    const { contextMenu } = styles
    if (props.shouldShow) {
        return (
            <ul
                className={`unstyledUl ${contextMenu} ${hardRoundedCorners}`}
                style={{ left: props.position }}
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