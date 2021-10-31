import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const ContextMenu = props => {
    const allContextMenuOptions = {
        queue: 'queue',
        open: 'open',
        rename: 'rename',
        delete: 'delete'
    }

    const handleContextOptionClick = event => {
        event.stopPropagation()

        const optionClicked = event.target.textContent.toLowerCase()
        switch (optionClicked) {
            case allContextMenuOptions.queue:
            case allContextMenuOptions.open:
                const closestEntry = event.target.closest('.directory-entry')
                props.closeContextMenu(event)
                closestEntry.click()
                break

            case allContextMenuOptions.delete:
                const directory = event.target.closest('.directory')

                break

            default:
                props.closeContextMenu(event)
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
                {capitalize(option)}</li>
        )
    })

    if (props.shouldShow) {
        return (
            <ul
                className="unstyled-ul context-menu hard-rounded-corners"
                onClick={props.openContextMenu}
            >
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu