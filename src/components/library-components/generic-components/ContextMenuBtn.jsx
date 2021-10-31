import React, { useEffect, useState } from 'react'

import contextMenuBtn from '../../../img/dark-btns/context.svg'
import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, showContextMenu ] = useState(undefined)

    const openContextMenu = event => {
        event.stopPropagation()

        showContextMenu(() => true)
    }

    const closeContextMenu = event => {
        event.stopPropagation()

        const didClickOnContextMenu = event.target.classList.contains('context-menu')
        const didClickOnContextMenuOption = event.target.classList.contains('.context-menu-option')
        const didClickInContextMenu = didClickOnContextMenu || didClickOnContextMenuOption

        !didClickInContextMenu && showContextMenu(() => false)
    }

    useEffect(() => {
        const isFirstRender = shouldShowContextMenu === undefined

        if (shouldShowContextMenu) {
            console.log('listener added')
            document.body.addEventListener('click', closeContextMenu)
        } else if (!isFirstRender) {
            console.log('listener removed')
            document.removeEventListener('click', closeContextMenu)
        }

        return () => {
            console.log('listener removed and component unmounted')
            document.removeEventListener('click', closeContextMenu)
        }
    }, [shouldShowContextMenu])

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