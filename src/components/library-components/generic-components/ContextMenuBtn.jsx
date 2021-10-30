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

        const contextMenu = document.querySelector('.context-menu')
        const didClickOnContextMenu = event.target.contains(contextMenu)

        !didClickOnContextMenu && showContextMenu(() => false)
    }

    useEffect(() => {
        const isFirstRender = shouldShowContextMenu === undefined

        if (shouldShowContextMenu) {
            document.body.addEventListener('click', closeContextMenu)
        } else if (!isFirstRender) {
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

            <ContextMenu shouldShow={shouldShowContextMenu} />
        </>
    )
}

export default ContextMenuBtn