import React, { useRef, useState } from 'react'

import contextMenuBtn from '../../../img/dark-btns/context.svg'
import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, isContextMenuShown ] = useState(false)
    const [ menuPos, setMenuPos ] = useState(0)

    const openContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(true)

        const contextBtnPos = event.target.getBoundingClientRect()
        const directoryEntryPos = event.target.parentElement.getBoundingClientRect()

        const positionForMenu = contextBtnPos.x - directoryEntryPos.x - 55
        setMenuPos(positionForMenu)
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
                position={menuPos}
                contextoptions={props.contextoptions}
                entry={props.entry}
                openContextMenu={openContextMenu}
                closeContextMenu={closeContextMenu}
            />
        </>
    )
}

export default ContextMenuBtn