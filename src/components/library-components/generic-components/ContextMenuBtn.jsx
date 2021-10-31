import React, { useEffect, useState } from 'react'

import contextMenuBtn from '../../../img/dark-btns/context.svg'
import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, showContextMenu ] = useState(false)

    const openContextMenu = event => {
        event.stopPropagation()

        showContextMenu(true)
    }

    const closeContextMenu = event => {
        event.stopPropagation()

        const didClickOnContextMenu = event.target.classList.contains('context-menu')
        const didClickOnContextMenuOption = event.target.classList.contains('.context-menu-option')
        const didClickInContextMenu = didClickOnContextMenu || didClickOnContextMenuOption

        if (!didClickInContextMenu) {
            showContextMenu(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', closeContextMenu)

        return () => document.body.removeEventListener('click', closeContextMenu)
    }, [])

    return (
        <>
            <img
                className='context-menu-btn overlay-component soft-rounded-corners'
                src={contextMenuBtn}
                alt='Context menu button'
                onClick={openContextMenu}
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