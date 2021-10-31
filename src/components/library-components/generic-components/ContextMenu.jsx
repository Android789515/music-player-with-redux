import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const ContextMenu = props => {
    const allContextMenuOptions = [
        'queue',
        'open',
        'rename',
        'delete'
    ]

    const contextMenuList = props.contextOptions.map(option => {
        const uuid = uuidv4()
        return <li key={uuid} className='context-menu-option'>{capitalize(option)}</li>
    })

    if (props.shouldShow) {
        return (
            <ul
                className='unstyled-ul context-menu hard-rounded-corners'
                onClick={props.openContextMenu}
            >
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu