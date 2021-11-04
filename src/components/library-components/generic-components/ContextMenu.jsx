import React, { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { customEvents } from '../../../events'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export const contextMenuOptions = {
    _queue: 'queue',
    _open: 'open',
    _rename: 'rename',
    _delete: 'delete'
}

const ContextMenu = props => {

    const handleContextOptionClick = event => {
        event.stopPropagation()

        const { target } = event
        const optionClicked = target.textContent.toLowerCase()
        const closestEntry = target.closest('.directory-entry')
        // props.closeContextMenu(event)

        switch (optionClicked) {
            case contextMenuOptions._queue:
            case contextMenuOptions._open:
                closestEntry.click()
                break

            case contextMenuOptions._rename:

                break

            case contextMenuOptions._delete:
                const deleteRequest = new Event(customEvents.deleteRequest)
                closestEntry.dispatchEvent(deleteRequest)
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

    const contextMenuList = props.contextoptions.map(option => {
        const uuid = uuidv4()
        return (
            <li
                key={uuid}
                className='context-menu-option'
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

    if (props.shouldShow) {
        return (
            <ul
                className='unstyled-ul context-menu hard-rounded-corners'
                tabIndex={0}
                onBlur={handleLoseFocus}
                ref={contextMenuRef}
            >
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu