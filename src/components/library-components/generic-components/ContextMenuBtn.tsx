import React, { useState } from 'react'

import genericStyles from '../../../css/GenericStyles.module.scss'
import styles from '../../../css/library/ContextMenuBtn.module.scss'
import buttonImg from '../../../img/dark-btns/context.svg'

import ContextMenu from './ContextMenu'

interface Props {
    showBtn: boolean,
    entry: any,
    entryRef: {
        current: HTMLLIElement
    },
    contextoptions: string[]
}

const ContextMenuBtn = ({ showBtn, entry, entryRef, contextoptions }: Props) => {
    const [ shouldShowContextMenu, isContextMenuShown ] = useState(false)
    const [ menuPos, setMenuPos ] = useState(0)

    const openContextMenu = (event: React.SyntheticEvent) => {
        event.stopPropagation()

        isContextMenuShown(true)

        const contextBtnPos = (event.target as HTMLElement).getBoundingClientRect()

        const positionForMenu = contextBtnPos.x

        setMenuPos(positionForMenu)
    }

    const openContextMenuOnEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            openContextMenu(event)
        }
    }

    const closeContextMenu = (event: React.SyntheticEvent) => {
        event.stopPropagation()

        isContextMenuShown(false)
    }

    const { overlayComponent, softRoundedCorners } = genericStyles
    const { contextMenuBtn, contextMenuBtnVisible } = styles
    return (
        <>
            <img
                className={`
                    ${contextMenuBtn} ${showBtn ? contextMenuBtnVisible : ''}
                    ${overlayComponent} ${softRoundedCorners}
                `}
                src={buttonImg}
                alt='Context menu button'
                tabIndex={0}
                onClick={openContextMenu}
                onKeyPress={openContextMenuOnEnter}
            />

            <ContextMenu
                entryRef={entryRef}
                shouldShow={shouldShowContextMenu}
                position={menuPos}
                contextoptions={contextoptions}
                entry={entry}
                openContextMenu={openContextMenu}
                closeContextMenu={closeContextMenu}
            />
        </>
    )
}

export default ContextMenuBtn