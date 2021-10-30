import React from 'react'

import contextMenuBtn from '../../img/dark-btns/context.svg'

const ContextMenuBtn = props => {
    return (
        <img
            className='context-menu-btn overlay-component'
            src={contextMenuBtn}
            alt='Context menu button'
        />
    )
}

export default ContextMenuBtn