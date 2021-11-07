import React from 'react'
import { useSelector } from 'react-redux'

import useButtonToggle from '../../hooks/useButtonToggle'

function MediaControlBtn(props) {
    const { name, isVolumeBtn, btnTheme, handleMediaBtnClick } = props

    const toggleBtns = {
        _SHUFFLE: 'shuffle',
        _LOOP: 'loop'
    }
    const isShuffleBtn = name === toggleBtns._SHUFFLE
    const isLoopBtn = name === toggleBtns._LOOP
    const isToggleBtn = isShuffleBtn || isLoopBtn
    const media = useSelector(state => state['media'])
    const { isToggled, toggle } = useButtonToggle((isLoopBtn && media.loop) ||
        (isShuffleBtn && media.shuffle) )

    let className
    let src
    if (isVolumeBtn) {
        className = `btn media-control-btn vol-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/vol-btns/${name}-btn.svg`).default

    } else {
        className = `btn media-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/media-btns/${name}-btn.svg`).default
    }

    const getToggleBtnClassName = () => isToggled ? 'toggled' : ''

    return (
        <img
            name={name}
            className={`${className} ${isToggleBtn ? getToggleBtnClassName() : ''}`.trim()}
            src={src}
            alt={name}
            onClick={() => {
                if (isToggleBtn) {
                    toggle()
                }
                handleMediaBtnClick()
            }}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        />
    )
}

MediaControlBtn.defaultProps = {
    btnTheme: 'dark'
}

export default MediaControlBtn