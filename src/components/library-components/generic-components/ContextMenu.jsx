import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const ContextMenu = props => {
    const contextMenuOptions = ['Rename', 'Delete']
    const contextMenuList = contextMenuOptions.map(option => {
        const uuid = uuidv4()
        return <li key={uuid} className='context-menu-option'>{option}</li>
    })

    if (props.shouldShow) {
        return (
            <ul className='unstyled-ul context-menu hard-rounded-corners'>
                {contextMenuList}
            </ul>
        )
    }

    return <></>
}

export default ContextMenu