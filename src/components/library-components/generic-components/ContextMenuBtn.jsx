import React, { useRef, useState } from 'react'

import contextMenuBtn from '../../../img/dark-btns/context.svg'
import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, isContextMenuShown ] = useState(false)
    const [ menuPos, setMenuPos ] = useState(0)

    const contextMenuBtnRef = useRef(undefined)

    const openContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(true)

        const targetPos = contextMenuBtnRef.current.getBoundingClientRect()
        const positionForMenu = targetPos.x - 138
        console.log(targetPos)
        setMenuPos(targetPos.x)
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
                ref={contextMenuBtnRef}
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