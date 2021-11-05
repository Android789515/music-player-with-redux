import React from 'react'
import useButtonToggle from '../../hooks/useButtonToggle'

function MediaControlBtn(props) {
    const { name, isVolumeBtn, btnTheme, handleMediaBtnClick } = props

    const { isToggled, toggle } = useButtonToggle()
    const toggleBtns = {
        _SHUFFLE: 'shuffle',
        _LOOP: 'loop'
    }
    const isShuffleBtn = name === toggleBtns._SHUFFLE
    const isLoopBtn = name === toggleBtns._LOOP
    const isToggleBtn = isShuffleBtn || isLoopBtn

    let className
    let src
    if (isVolumeBtn) {
        className = `btn media-control-btn vol-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/vol-btns/${name}-btn.svg`).default

    } else {
        className = `btn media-control-btn ${name}-btn ${btnTheme}-btn`
        src = require(`../../img/${btnTheme}-btns/media-btns/${name}-btn.svg`).default
    }

    return (
        <img
            name={name}
            className={`${className} ${isToggleBtn ? isToggled : ''}`.trim()}
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