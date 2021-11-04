import React, { useState } from 'react'

import contextMenuBtn from '../../../img/dark-btns/context.svg'
import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, isContextMenuShown ] = useState(false)

    const openContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(true)
    }

    const closeContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(false)
    }

    return (
        <>
            <img
                className='context-menu-btn overlay-component soft-rounded-corners'
                src={contextMenuBtn}
                alt='Context menu button'
                tabIndex={0}
                onClick={openContextMenu}
                onKeyPress={event => event.key === 'Enter' && openContextMenu(event)}
            />

            <ContextMenu
                shouldShow={shouldShowContextMenu}
                openContextMenu={openContextMenu}
                closeContextMenu={closeContextMenu}
                contextoptions={props.contextoptions}
            />
        </>
    )
}

export default ContextMenuBtn