import React, { useState } from 'react'

import { overlayComponent, softRoundedCorners } from '../../../css/modules/GenericStyles.module.scss'
import { contextMenuBtn } from '../../../css/modules/library/ContextMenuBtn.module.scss'
import buttonImg from '../../../img/dark-btns/context.svg'

import ContextMenu from './ContextMenu'

const ContextMenuBtn = props => {
    const [ shouldShowContextMenu, isContextMenuShown ] = useState(false)
    const [ menuPos, setMenuPos ] = useState(0)

    const openContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(true)

        const contextBtnPos = event.target.getBoundingClientRect()
        const directoryEntryPos = event.target.parentElement.getBoundingClientRect()

        const positionForMenu = contextBtnPos.x - directoryEntryPos.x - 52
        setMenuPos(positionForMenu)
    }

    const openContextMenuOnEnter = event => {
        if (event.key === 'Enter') {
            openContextMenu(event)
        }
    }

    const closeContextMenu = event => {
        event.stopPropagation()

        isContextMenuShown(false)
    }

    return (
        <>
            <img
                className={`${contextMenuBtn} ${overlayComponent} ${softRoundedCorners}`}
                src={buttonImg}
                alt='Context menu button'
                tabIndex={0}
                onClick={openContextMenu}
                onKeyPress={openContextMenuOnEnter}
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