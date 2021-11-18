import React from 'react'
import { useSelector } from 'react-redux'

import styles from '../../css/modules/media-player/MediaControls.module.scss'
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
    const {
        mediaControlBtn,
        volControlBtn
    } = styles
    const buttonType = styles[`${name}Btn`]
    if (isVolumeBtn) {
        className = `btn ${mediaControlBtn} ${volControlBtn} ${buttonType}`
        src = require(`../../img/${btnTheme}-btns/vol-btns/${name}-btn.svg`).default

    } else {
        className = `btn ${mediaControlBtn} ${buttonType}`
        src = require(`../../img/${btnTheme}-btns/media-btns/${name}-btn.svg`).default
    }

    const getToggleBtnClassName = () => (isToggled ? styles.toggled : '').trim()

    return (
        <img
            name={name}
            className={`${className} ${isToggleBtn ? getToggleBtnClassName() : ''}`}
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