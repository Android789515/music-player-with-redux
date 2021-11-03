import React from 'react'
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

        const optionClicked = event.target.textContent.toLowerCase()
        const closestEntry = event.target.closest('.directory-entry')
        props.closeContextMenu(event)

        switch (optionClicked) {
            case contextMenuOptions._queue:
            case contextMenuOptions._open:
                props.closeContextMenu(event)
                closestEntry.click()
                break

            case contextMenuOptions._delete:
                const deleteRequest = new Event(customEvents.deleteRequest)
                closestEntry.dispatchEvent(deleteRequest)
                break

            default:
                return
        }
    }

    const contextMenuList = props.contextoptions.map(option => {
        const uuid = uuidv4()
        return (
            <li
                key={uuid}
                className="context-menu-option"
                onClick={handleContextOptionClick}
            >
                {capitalize(option)}
            </li>
        )
    })

    if (props.shouldShow) {
        return (
            <ul className="unstyled-ul context-menu hard-rounded-corners">
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu